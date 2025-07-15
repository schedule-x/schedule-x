import {
  CalendarAppSingleton,
  CalendarEventInternal,
  PluginBase,
  addDays,
} from '@schedule-x/shared/src'
import { IcalExpander } from './ical-expander/IcalExpander'
import { externalEventToInternal } from '@schedule-x/shared/src/utils/stateless/calendar/external-event-to-internal'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { Temporal } from 'temporal-polyfill'

type ICalendarPluginOptions = {
  data: string
}

type ICalTime = {
  startDate: { toJSDate: () => Date }
  endDate: { toJSDate: () => Date }
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
   * plugin.between('2021-01-01', '2021-12-31')
   * ```
   * */
  public between(dateRangeStart: Temporal.ZonedDateTime, dateRangeEnd: Temporal.ZonedDateTime) {
    const after = new Date(dateRangeStart.toInstant().epochMilliseconds)
    const before = new Date(dateRangeEnd.toInstant().epochMilliseconds)
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
    ].map((eventOrOccurrence: CalendarEventInternal) => {
      const midnight = '00:00'

      if (this.isInferredFullDayEvent(eventOrOccurrence)) {
        eventOrOccurrence.start = Temporal.PlainDate.from(eventOrOccurrence.start)
        eventOrOccurrence.end = addDays(Temporal.PlainDate.from(eventOrOccurrence.end), -1)
      }
      return eventOrOccurrence
    })
  }

  private isInferredFullDayEvent(eventOrOccurrence: CalendarEventInternal) {
    if (!(eventOrOccurrence.start instanceof Temporal.ZonedDateTime) || !(eventOrOccurrence.end instanceof Temporal.ZonedDateTime)) {
      return false
    }

    const startHour = eventOrOccurrence.start.hour
    const startMinute = eventOrOccurrence.start.minute
    const endHour = eventOrOccurrence.end.hour
    const endMinute = eventOrOccurrence.end.minute

    return startHour === 0
      && startMinute === 0
      && endHour === 0
      && endMinute === 0
  }

  private icalOccurrenceToSXEvent = (
    occurrence: ICalOccurrence
  ): CalendarEventInternal => {
    const startInstant = Temporal.Instant.from(occurrence.startDate.toJSDate().toISOString())
    const endInstant = Temporal.Instant.from(occurrence.endDate.toJSDate().toISOString())
    const startZonedDateTime = startInstant.toZonedDateTimeISO(this.$app.config.timezone.value)
    const endZonedDateTime = endInstant.toZonedDateTimeISO(this.$app.config.timezone.value)

    return externalEventToInternal(
      {
        id: occurrence.eventId,
        title: occurrence.item.summary,
        description: occurrence.item.description,
        location: occurrence.item.location,
        start: startZonedDateTime,
        end: endZonedDateTime,
      },
      this.$app.config
    )
  }

  private icalEventToSXEvent = (event: ICalEvent): CalendarEventInternal => {
    const startInstant = Temporal.Instant.from(event.startDate.toJSDate().toISOString())
    const endInstant = Temporal.Instant.from(event.endDate.toJSDate().toISOString())
    const startZonedDateTime = startInstant.toZonedDateTimeISO(this.$app.config.timezone.value)
    const endZonedDateTime = endInstant.toZonedDateTimeISO(this.$app.config.timezone.value)

    return externalEventToInternal(
      {
        id: event.eventId,
        title: event.summary,
        description: event.description,
        location: event.location,
        start: startZonedDateTime,
        end: endZonedDateTime,
      },
      this.$app.config
    )
  }
}

export const createIcalendarPlugin = (options: ICalendarPluginOptions) => {
  return definePlugin('ICalendarPlugin', new IcalendarPluginImpl(options))
}
