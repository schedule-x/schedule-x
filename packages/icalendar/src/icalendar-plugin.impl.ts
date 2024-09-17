import {
  CalendarAppSingleton,
  CalendarEvent,
  PluginBase,
  toDateTimeString,
  toJSDate,
} from '@schedule-x/shared/src'
import { IcalExpander } from './ical-expander/IcalExpander'

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

class IcalendarPluginImpl implements PluginBase {
  name = 'ICalendarPlugin'
  private $app!: CalendarAppSingleton
  private readonly source: string = ''

  constructor(private options: ICalendarPluginOptions) {
    this.source = options.data
  }

  public beforeInit($app: CalendarAppSingleton) {
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

  private icalOccurrenceToSXEvent(occurrence: ICalOccurrence): CalendarEvent {
    return {
      id: occurrence.eventId,
      title: occurrence.item.summary,
      description: occurrence.item.description,
      location: occurrence.item.location,
      start: toDateTimeString(occurrence.startDate.toJSDate()),
      end: toDateTimeString(occurrence.endDate.toJSDate()),
    }
  }

  private icalEventToSXEvent(event: ICalEvent): CalendarEvent {
    return {
      id: event.eventId,
      title: event.summary,
      description: event.description,
      location: event.location,
      start: toDateTimeString(event.startDate.toJSDate()),
      end: toDateTimeString(event.endDate.toJSDate()),
    }
  }
}

export const createIcalendarPlugin = (options: ICalendarPluginOptions) => {
  return new IcalendarPluginImpl(options)
}
