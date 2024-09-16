import { CalendarAppSingleton, CalendarEvent, PluginBase, toDateTimeString, toJSDate } from '@schedule-x/shared/src'
import ICAL from 'ical.js'
import { IcalExpander } from './ical-expander/IcalExpander'

type ICalendarPluginOptions = {
  source: string
}

class IcalendarPluginImpl implements PluginBase {
  name = 'ICalendarPlugin'
  private $app!: CalendarAppSingleton
  private source: string = ''

  private events: CalendarEvent[] = []

  constructor(private options: ICalendarPluginOptions) {
    this.source = options.source
  }

  beforeInit($app: CalendarAppSingleton) {
    this.$app = $app
    let dateRangeStart = $app.calendarState.range.value?.start
    let dateRangeEnd = $app.calendarState.range.value?.end
    if (!dateRangeStart || !dateRangeEnd) return

    const after = toJSDate(dateRangeStart)
    const before = toJSDate(dateRangeEnd)
    this.parseIcalendarSource(after, before)
  }

  private parseIcalendarSource(after: Date, before: Date) {
    const icalExpander = new IcalExpander({
      ics: this.source,
    })

    const { occurrences, events } = icalExpander.between(after, before)

    this.events = [
      ...occurrences.map(this.icalOccurrenceToSXEvent),
      ...events.map(this.icalEventToSXEvent),
    ]
    console.log(this.events)
  }


  private icalOccurrenceToSXEvent(occurrence: ICAL.Event): CalendarEvent {
    return {
      id: occurrence.eventId,
      title: occurrence.item.summary,
      description: occurrence.item.description,
      location: occurrence.item.location,
      start: toDateTimeString(occurrence.startDate.toJSDate()),
      end: toDateTimeString(occurrence.endDate.toJSDate()),
    }
  }

  private icalEventToSXEvent(event: ICAL.Event): CalendarEvent {
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
