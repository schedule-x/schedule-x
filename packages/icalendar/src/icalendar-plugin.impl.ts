import { CalendarAppSingleton, PluginBase } from '@schedule-x/shared/src'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ICAL from 'ical.js'

class IcalendarPluginImpl implements PluginBase {
  name = 'IcalendarPlugin'
  private $app!: CalendarAppSingleton

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
    console.log(events)
  }
}

export const createIcalendarPlugin = () => new IcalendarPluginImpl()
