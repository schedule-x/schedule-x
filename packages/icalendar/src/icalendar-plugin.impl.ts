import { CalendarAppSingleton, PluginBase } from '@schedule-x/shared/src'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ICAL from 'ical.js'
import { CalendarEvent } from '@schedule-x/shared/src'
import { randomStringId, toDateTimeString } from '@schedule-x/shared/src'

// type ICALDate = { toJSDate: () => Date }

class IcalendarPluginImpl implements PluginBase {
  name = 'IcalendarPlugin'
  private $app!: CalendarAppSingleton

  private events: CalendarEvent[] = []

  beforeInit($app: CalendarAppSingleton) {
    this.$app = $app
    this.parseIcalendarSource(
      'BEGIN:VCALENDAR\n' +
        'VERSION:2.0\n' +
        'CALSCALE:GREGORIAN\n' +
        'BEGIN:VEVENT\n' +
        'SUMMARY:Access-A-Ride Pickup\n' +
        'DTSTART;TZID=America/New_York:20130802T103400\n' +
        'DTEND;TZID=America/New_York:20130802T110400\n' +
        'LOCATION:1000 Broadway Ave.\\, Brooklyn\n' +
        'DESCRIPTION: Access-A-Ride trip to 900 Jay St.\\, Brooklyn\n' +
        'STATUS:CONFIRMED\n' +
        'SEQUENCE:3\n' +
        'BEGIN:VALARM\n' +
        'TRIGGER:-PT10M\n' +
        'DESCRIPTION:Pickup Reminder\n' +
        'ACTION:DISPLAY\n' +
        'END:VALARM\n' +
        'END:VEVENT\n' +
        'BEGIN:VEVENT\n' +
        'RRULE:FREQ=DAILY;COUNT=3\n' +
        'SUMMARY:Access-A-Ride Pickup\n' +
        'DTSTART;TZID=America/New_York:20130802T200000\n' +
        'DTEND;TZID=America/New_York:20130802T203000\n' +
        'LOCATION:900 Jay St.\\, Brooklyn\n' +
        'DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\\, Brooklyn\n' +
        'STATUS:CONFIRMED\n' +
        'SEQUENCE:3\n' +
        'BEGIN:VALARM\n' +
        'TRIGGER:-PT10M\n' +
        'DESCRIPTION:Pickup Reminder\n' +
        'ACTION:DISPLAY\n' +
        'END:VALARM\n' +
        'END:VEVENT\n' +
        'END:VCALENDAR'
    )
  }

  private parseIcalendarSource(source: string) {
    const jcalData = ICAL.parse(source)
    const component = new ICAL.Component(jcalData)
    const events = component
      .getAllSubcomponents('vevent')
      .map((vevent) => new ICAL.Event(vevent))
      .forEach(this.expandEvent)
  }

  private expandEvent = (eventComp: ICAL.Event) => {
    const sxEvent: CalendarEvent = {
      start: toDateTimeString(eventComp.startDate.toJSDate()),
      end: toDateTimeString(eventComp.endDate.toJSDate()),
      title: eventComp.summary,
      description: eventComp.description,
      location: eventComp.location,
      id: randomStringId(),
    }

    this.events.push(sxEvent)

    if (eventComp.isRecurring()) {
      this.expandOccurrences(eventComp)
    }
  }

  private expandOccurrences(event: ICAL.Event) {
    const iterator = event.iterator()
    let occurrence: ICAL.Event | null
    while ((occurrence = iterator.next())) {
      const occurrence: CalendarEvent = {
        start: toDateTimeString(occurrence.startDate.toJSDate()),
        end: toDateTimeString(occurrence.endDate.toJSDate()),
        title: occurrence.summary,
        description: occurrence.description,
        location: occurrence.location,
        id: randomStringId(),
      }
      this.events.push(occurrence)
    }
  }
}

export const createIcalendarPlugin = () => new IcalendarPluginImpl()
