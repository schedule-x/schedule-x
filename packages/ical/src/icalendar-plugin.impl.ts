import {
  CalendarAppSingleton,
  CalendarEventInternal,
  PluginBase,
  toDateTimeString,
  toJSDate,
} from '@schedule-x/shared/src'
import { IcalExpander } from './ical-expander/IcalExpander'
import { externalEventToInternal } from '@schedule-x/shared/src/utils/stateless/calendar/external-event-to-internal'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'

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
  public between(dateRangeStart: string, dateRangeEnd: string) {
    const after = toJSDate(dateRangeStart)
    const before = toJSDate(dateRangeEnd)
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
    return externalEventToInternal(
      {
        id: occurrence.eventId,
        title: occurrence.item.summary,
        description: occurrence.item.description,
        location: occurrence.item.location,
        start: toDateTimeString(occurrence.startDate.toJSDate()),
        end: toDateTimeString(occurrence.endDate.toJSDate()),
      },
      this.$app.config
    )
  }

  private icalEventToSXEvent = (event: ICalEvent): CalendarEventInternal => {
    return externalEventToInternal(
      {
        id: event.eventId,
        title: event.summary,
        description: event.description,
        location: event.location,
        start: toDateTimeString(event.startDate.toJSDate()),
        end: toDateTimeString(event.endDate.toJSDate()),
      },
      this.$app.config
    )
  }
}

export const createIcalendarPlugin = (options: ICalendarPluginOptions) => {
  return definePlugin('ICalendarPlugin', new IcalendarPluginImpl(options))
}
