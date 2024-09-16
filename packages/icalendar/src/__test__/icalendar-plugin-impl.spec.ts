import {
  describe,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createIcalendarPlugin } from '../icalendar-plugin.impl'

describe('IcalendarPluginImpl', () => {
  describe('parse plugins', () => {
    it('should parse icalendar source', () => {
      const plugin = createIcalendarPlugin({
        source: 'BEGIN:VCALENDAR\n' +
          'VERSION:2.0\n' +
          'CALSCALE:GREGORIAN\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Good morning\n' +
          'DTSTART;TZID=America/New_York:20130802T103400\n' +
          'DTEND;TZID=America/New_York:20130802T110400\n' +
          'LOCATION:1000 Broadway Ave.\\, Brooklyn\n' +
          'DESCRIPTION: Access-A-Ride trip to 900 Jay St.\\, Brooklyn\n' +
          'STATUS:CONFIRMED\n' +
          'SEQUENCE:3\n' +
          'END:VEVENT\n' +
          'BEGIN:VEVENT\n' +
          'RRULE:FREQ=DAILY;COUNT=3\n' +
          'SUMMARY:Good night\n' +
          'DTSTART;TZID=America/New_York:20130802T200000\n' +
          'DTEND;TZID=America/New_York:20130802T203000\n' +
          'LOCATION:900 Jay St.\\, Brooklyn\n' +
          'DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\\, Brooklyn\n' +
          'STATUS:CONFIRMED\n' +
          'SEQUENCE:3\n' +
          'END:VEVENT\n' +
          'END:VCALENDAR'
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: '2013-08-02',
      })
      plugin.beforeInit($app)
    })
  })
})
