import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createIcalendarPlugin } from '../icalendar-plugin.impl'


describe('IcalendarPluginImpl', () => {
  describe('parsing events on init', () => {
    it('should parse icalendar source with 1 recurring event and 1 normal event', () => {
      const plugin = createIcalendarPlugin({
        data:
          'BEGIN:VCALENDAR\n' +
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
          'END:VCALENDAR',
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: Temporal.PlainDate.from('2013-08-02'),
      })
      plugin.beforeRender($app)

      expect($app.calendarEvents.list.value.length).toBe(4)
    })
  })

  describe('parsing events on range change', () => {
    it('should first display an event on 2024-08-01 and then display 2 events on 2024-09-02', () => {
      const plugin = createIcalendarPlugin({
        data:
          'BEGIN:VCALENDAR\n' +
          'VERSION:2.0\n' +
          'CALSCALE:GREGORIAN\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Good morning\n' +
          'DTSTART;TZID=America/New_York:20240801T103400\n' +
          'DTEND;TZID=America/New_York:20240801T110400\n' +
          'LOCATION:1000 Broadway Ave.\\, Brooklyn\n' +
          'DESCRIPTION: Access-A-Ride trip to 900 Jay St.\\, Brooklyn\n' +
          'STATUS:CONFIRMED\n' +
          'SEQUENCE:3\n' +
          'END:VEVENT\n' +
          'BEGIN:VEVENT\n' +
          'RRULE:FREQ=DAILY;COUNT=3\n' +
          'SUMMARY:Good night\n' +
          'DTSTART;TZID=America/New_York:20240902T200000\n' +
          'DTEND;TZID=America/New_York:20240902T203000\n' +
          'LOCATION:900 Jay St.\\, Brooklyn\n' +
          'DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\\, Brooklyn\n' +
          'STATUS:CONFIRMED\n' +
          'SEQUENCE:3\n' +
          'END:VEVENT\n' +
          'END:VCALENDAR',
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: Temporal.PlainDate.from('2024-08-01'),
      })
      plugin.beforeRender($app)

      expect($app.calendarEvents.list.value.length).toBe(1)

      $app.calendarState.range.value = {
        start: Temporal.ZonedDateTime.from('2024-09-01T00:00:00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-09-05T23:59:59+00:00[UTC]'),
      }
      plugin.between(Temporal.ZonedDateTime.from('2024-09-01T00:00:00+00:00[UTC]'), Temporal.ZonedDateTime.from('2024-09-05T23:59:59+00:00[UTC]'))

      expect($app.calendarEvents.list.value.length).toBe(3)
    })
  })

  describe('parsing a full day event', () => {
    it('should parse a full day event with date type', () => {
      const plugin = createIcalendarPlugin({
        data:
          'BEGIN:VCALENDAR\n' +
          'VERSION:2.0\n' +
          'CALSCALE:GREGORIAN\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Good morning\n' +
          'DTSTART;VALUE=DATE:20230801\n' +
          'DTEND;VALUE=DATE:20230802\n' +
          'LOCATION:1000 Broadway Ave.\\, Brooklyn\n' +
          'DESCRIPTION: Access-A-Ride trip to 900 Jay St.\\, Brooklyn\n' +
          'STATUS:CONFIRMED\n' +
          'SEQUENCE:3\n' +
          'END:VEVENT\n' +
          'END:VCALENDAR',
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: Temporal.PlainDate.from('2023-08-01'),
      })
      plugin.beforeRender($app)

      expect($app.calendarEvents.list.value.length).toBe(1)
      expect($app.calendarEvents.list.value[0].start).toEqual(Temporal.PlainDate.from('2023-08-01'))
      expect($app.calendarEvents.list.value[0].end).toEqual(Temporal.PlainDate.from('2023-08-01'))
    })

    it('should parse a full day event with date-time type', () => {
      const plugin = createIcalendarPlugin({
        data:
          'BEGIN:VCALENDAR\n' +
          'VERSION:2.0\n' +
          'CALSCALE:GREGORIAN\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Good morning\n' +
          'DTSTART;VALUE=DATE-TIME:20230801T000000\n' +
          'DTEND;VALUE=DATE-TIME:20230802T000000\n' +
          'LOCATION:1000 Broadway Ave.\\, Brooklyn\n' +
          'DESCRIPTION: Access-A-Ride trip to 900 Jay St.\\, Brooklyn\n' +
          'STATUS:CONFIRMED\n' +
          'SEQUENCE:3\n' +
          'END:VEVENT\n' +
          'END:VCALENDAR',
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: Temporal.PlainDate.from('2023-08-01'),
      })
      plugin.beforeRender($app)

      expect($app.calendarEvents.list.value.length).toBe(1)
      expect($app.calendarEvents.list.value[0].start).toEqual(Temporal.PlainDate.from('2023-08-01'))
      expect($app.calendarEvents.list.value[0].end).toEqual(Temporal.PlainDate.from('2023-08-01'))
    })
  })
})
