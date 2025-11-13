import {
  CalendarAppSingleton,
  CalendarEventInternal,
  PluginBase,
} from '@schedule-x/shared/src'
import { IcalExpander } from './ical-expander/IcalExpander'
import { externalEventToInternal } from '@schedule-x/shared/src/utils/stateless/calendar/external-event-to-internal'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'

type ICalendarPluginOptions = {
  data: string
}

type DateRangeBoundary = Temporal.ZonedDateTime

type ICalDateLike = {
  isDate?: boolean
  toJSDate: () => Date
  year: number
  month: number
  day: number
  hour?: number
  minute?: number
  second?: number
}

type ICalTime = {
  startDate: ICalDateLike
  endDate: ICalDateLike
}

type ICalOccurrence = {
  eventId: string
  item: {
    summary: string
    description: string
    location: string
  }
} & ICalTime

type ICalEvent = {
  eventId: string
  summary: string
  description: string
  location: string
} & ICalTime

class IcalendarPluginImpl implements PluginBase<string> {
  name = 'ICalendarPlugin'
  private $app!: CalendarAppSingleton
  private readonly source: string = ''

  constructor(private options: ICalendarPluginOptions) {
    this.source = options.data
  }

  public beforeRender($app: CalendarAppSingleton) {
    this.$app = $app
    const dateRangeStart = $app.calendarState.range.value?.start
    const dateRangeEnd = $app.calendarState.range.value?.end
    if (!dateRangeStart || !dateRangeEnd) return

    this.between(dateRangeStart, dateRangeEnd)
  }

  /**
   * @param dateRangeStart - The start date of the range
   * @param dateRangeEnd - The end date of the range
   *
   * @example
   * ```ts
   * plugin.between(
   *   Temporal.ZonedDateTime.from('2021-01-01T00:00:00Z[UTC]'),
   *   Temporal.ZonedDateTime.from('2021-12-31T23:59:59Z[UTC]')
   * )
   * ```
   * */
  public between(
    dateRangeStart: DateRangeBoundary,
    dateRangeEnd: DateRangeBoundary
  ) {
    const after = this.rangeBoundaryToDate(dateRangeStart)
    const before = this.rangeBoundaryToDate(dateRangeEnd)
    this.parseIcalendarSourceForDatesBetween(after, before)
  }

  private parseIcalendarSourceForDatesBetween(after: Date, before: Date) {
    const icalExpander = new IcalExpander({
      ics: this.source,
    })

    const { occurrences, events } = icalExpander.between(after, before)

    this.$app.calendarEvents.list.value = [
      ...occurrences.map(this.icalOccurrenceToSXEvent),
      ...events.map(this.icalEventToSXEvent),
    ]
  }

  private icalOccurrenceToSXEvent = (
    occurrence: ICalOccurrence
  ): CalendarEventInternal => {
    const { start, end } = this.toTemporalRange(
      occurrence.startDate,
      occurrence.endDate
    )

    return externalEventToInternal(
      {
        id: occurrence.eventId,
        title: occurrence.item.summary,
        description: occurrence.item.description,
        location: occurrence.item.location,
        start,
        end,
      },
      this.$app.config
    )
  }

  private icalEventToSXEvent = (event: ICalEvent): CalendarEventInternal => {
    const { start, end } = this.toTemporalRange(event.startDate, event.endDate)

    return externalEventToInternal(
      {
        id: event.eventId,
        title: event.summary,
        description: event.description,
        location: event.location,
        start,
        end,
      },
      this.$app.config
    )
  }

  private toTemporalRange(
    start: ICalDateLike,
    end: ICalDateLike
  ): {
    start: Temporal.ZonedDateTime | Temporal.PlainDate
    end: Temporal.ZonedDateTime | Temporal.PlainDate
  } {
    const startTemporal = this.icalDateToTemporal(start)
    const endTemporal = this.icalDateToTemporal(end)

    const normalizedAllDayRange = this.normalizeAllDayRange(
      startTemporal,
      endTemporal
    )
    if (normalizedAllDayRange) {
      return normalizedAllDayRange
    }

    return this.normalizeMidnightTimedRange(startTemporal, endTemporal)
  }

  private icalDateToTemporal(
    dateLike: ICalDateLike
  ): Temporal.ZonedDateTime | Temporal.PlainDate {
    if (dateLike.isDate) {
      return Temporal.PlainDate.from({
        year: dateLike.year,
        month: dateLike.month,
        day: dateLike.day,
      })
    }

    const plainDateTime = Temporal.PlainDateTime.from({
      year: dateLike.year,
      month: dateLike.month,
      day: dateLike.day,
      hour: dateLike.hour ?? 0,
      minute: dateLike.minute ?? 0,
      second: dateLike.second ?? 0,
    })

    return plainDateTime.toZonedDateTime('UTC')
  }

  private normalizeAllDayRange(
    start: Temporal.ZonedDateTime | Temporal.PlainDate,
    end: Temporal.ZonedDateTime | Temporal.PlainDate
  ):
    | {
        start: Temporal.PlainDate
        end: Temporal.PlainDate
      }
    | undefined {
    if (
      start instanceof Temporal.PlainDate &&
      end instanceof Temporal.PlainDate &&
      Temporal.PlainDate.compare(end, start) >= 0
    ) {
      if (Temporal.PlainDate.compare(end, start) === 0) {
        return { start, end }
      }

      return { start, end: end.subtract({ days: 1 }) }
    }

    return undefined
  }

  private normalizeMidnightTimedRange(
    start: Temporal.ZonedDateTime | Temporal.PlainDate,
    end: Temporal.ZonedDateTime | Temporal.PlainDate
  ): {
    start: Temporal.ZonedDateTime | Temporal.PlainDate
    end: Temporal.ZonedDateTime | Temporal.PlainDate
  } {
    if (
      start instanceof Temporal.ZonedDateTime &&
      end instanceof Temporal.ZonedDateTime
    ) {
      const midnight = Temporal.PlainTime.from('00:00')
      const startIsMidnight = start.toPlainTime().equals(midnight)
      const endIsMidnight = end.toPlainTime().equals(midnight)

      if (startIsMidnight && endIsMidnight) {
        const startDate = Temporal.PlainDate.from(start)
        const endDate = Temporal.PlainDate.from(end)

        if (Temporal.PlainDate.compare(endDate, startDate) > 0) {
          return {
            start: startDate,
            end: endDate.subtract({ days: 1 }),
          }
        }
      }
    }

    return { start, end }
  }

  private rangeBoundaryToDate(boundary: DateRangeBoundary): Date {
    return new Date(boundary.toInstant().epochMilliseconds)
  }
}

export const createIcalendarPlugin = (options: ICalendarPluginOptions) => {
  return definePlugin('ICalendarPlugin', new IcalendarPluginImpl(options))
}
