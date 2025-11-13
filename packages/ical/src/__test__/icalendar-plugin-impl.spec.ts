/* eslint-disable max-lines */
import 'temporal-polyfill/global'
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
      const goodMorning = $app.calendarEvents.list.value.find(
        (event) => event.title === 'Good morning'
      )
      expect(goodMorning?.start.toString()).toBe(
        '2013-08-02T10:34:00+00:00[UTC]'
      )
      expect(goodMorning?.end.toString()).toBe('2013-08-02T11:04:00+00:00[UTC]')
      const goodNight = $app.calendarEvents.list.value.find(
        (event) => event.title === 'Good night'
      )
      expect(goodNight?.start.toString()).toBe('2013-08-02T20:00:00+00:00[UTC]')
      expect(goodNight?.end.toString()).toBe('2013-08-02T20:30:00+00:00[UTC]')

      const occurrences = $app.calendarEvents.list.value.filter(
        (event) => event.title === 'Good night'
      )
      expect(occurrences.map((event) => event.start.toString())).toEqual([
        '2013-08-02T20:00:00+00:00[UTC]',
        '2013-08-03T20:00:00+00:00[UTC]',
        '2013-08-04T20:00:00+00:00[UTC]',
      ])
      expect(occurrences.map((event) => event.end.toString())).toEqual([
        '2013-08-02T20:30:00+00:00[UTC]',
        '2013-08-03T20:30:00+00:00[UTC]',
        '2013-08-04T20:30:00+00:00[UTC]',
      ])
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
      plugin.between(
        Temporal.ZonedDateTime.from('2024-09-01T00:00:00+00:00[UTC]'),
        Temporal.ZonedDateTime.from('2024-09-05T23:59:59+00:00[UTC]')
      )

      expect($app.calendarEvents.list.value.length).toBe(3)

      const rangeStart = Temporal.ZonedDateTime.from(
        '2024-09-01T00:00:00+00:00[UTC]'
      )
      const rangeEnd = Temporal.ZonedDateTime.from(
        '2024-09-05T23:59:59+00:00[UTC]'
      )

      const eventsWithinRange = $app.calendarEvents.list.value.every(
        (event) => {
          if (
            event.start instanceof Temporal.PlainDate &&
            event.end instanceof Temporal.PlainDate
          ) {
            return (
              Temporal.PlainDate.compare(
                event.start,
                rangeStart.toPlainDate()
              ) >= 0 &&
              Temporal.PlainDate.compare(event.end, rangeEnd.toPlainDate()) <= 0
            )
          }

          if (
            event.start instanceof Temporal.ZonedDateTime &&
            event.end instanceof Temporal.ZonedDateTime
          ) {
            const startInstant = event.start.toInstant().epochMilliseconds
            const endInstant = event.end.toInstant().epochMilliseconds

            return (
              startInstant >= rangeStart.toInstant().epochMilliseconds &&
              endInstant <= rangeEnd.toInstant().epochMilliseconds
            )
          }

          return false
        }
      )

      expect(eventsWithinRange).toBe(true)
    })

    it('should exclude events that fall outside the provided range', () => {
      const plugin = createIcalendarPlugin({
        data:
          'BEGIN:VCALENDAR\n' +
          'VERSION:2.0\n' +
          'CALSCALE:GREGORIAN\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Inside range\n' +
          'DTSTART:20240102T080000\n' +
          'DTEND:20240102T090000\n' +
          'END:VEVENT\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Outside range\n' +
          'DTSTART:20240110T080000\n' +
          'DTEND:20240110T090000\n' +
          'END:VEVENT\n' +
          'END:VCALENDAR',
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })
      plugin.beforeRender($app)

      plugin.between(
        Temporal.ZonedDateTime.from('2024-01-01T00:00:00+00:00[UTC]'),
        Temporal.ZonedDateTime.from('2024-01-05T23:59:59+00:00[UTC]')
      )

      expect($app.calendarEvents.list.value).toHaveLength(1)
      expect($app.calendarEvents.list.value[0].title).toBe('Inside range')
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
      expect($app.calendarEvents.list.value[0].start).toEqual(
        Temporal.PlainDate.from('2023-08-01')
      )
      expect($app.calendarEvents.list.value[0].end).toEqual(
        Temporal.PlainDate.from('2023-08-01')
      )
    })

    it('should normalize a multi-day full day event with date type', () => {
      const plugin = createIcalendarPlugin({
        data:
          'BEGIN:VCALENDAR\n' +
          'VERSION:2.0\n' +
          'CALSCALE:GREGORIAN\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Multi day date event\n' +
          'DTSTART;VALUE=DATE:20230801\n' +
          'DTEND;VALUE=DATE:20230804\n' +
          'END:VEVENT\n' +
          'END:VCALENDAR',
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: Temporal.PlainDate.from('2023-08-01'),
      })
      plugin.beforeRender($app)

      expect($app.calendarEvents.list.value).toHaveLength(1)
      expect($app.calendarEvents.list.value[0].start).toEqual(
        Temporal.PlainDate.from('2023-08-01')
      )
      expect($app.calendarEvents.list.value[0].end).toEqual(
        Temporal.PlainDate.from('2023-08-03')
      )
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
      expect($app.calendarEvents.list.value[0].start).toEqual(
        Temporal.PlainDate.from('2023-08-01')
      )
      expect($app.calendarEvents.list.value[0].end).toEqual(
        Temporal.PlainDate.from('2023-08-01')
      )
    })

    it('should normalize timed events that start and end at midnight across multiple days', () => {
      const plugin = createIcalendarPlugin({
        data:
          'BEGIN:VCALENDAR\n' +
          'VERSION:2.0\n' +
          'CALSCALE:GREGORIAN\n' +
          'BEGIN:VEVENT\n' +
          'SUMMARY:Midnight multi-day\n' +
          'DTSTART:20230801T000000\n' +
          'DTEND:20230803T000000\n' +
          'END:VEVENT\n' +
          'END:VCALENDAR',
      })
      const $app = __createAppWithViews__({
        plugins: [plugin],
        selectedDate: Temporal.PlainDate.from('2023-08-01'),
      })
      plugin.beforeRender($app)

      expect($app.calendarEvents.list.value).toHaveLength(1)
      expect($app.calendarEvents.list.value[0].start).toEqual(
        Temporal.PlainDate.from('2023-08-01')
      )
      expect($app.calendarEvents.list.value[0].end).toEqual(
        Temporal.PlainDate.from('2023-08-02')
      )
    })
  })
})
