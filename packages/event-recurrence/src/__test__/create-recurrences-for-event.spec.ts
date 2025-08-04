/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import {
  createRecurrencesForEvent,
  createRecurrencesForBackgroundEvent,
} from '../util/stateless/create-recurrences-for-event'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import 'temporal-polyfill/global'


describe('createRecurrencesForEvent', () => {
  let $app: CalendarAppSingleton

  beforeEach(() => {
    $app = __createAppWithViews__()
  })

  describe('weekly events', () => {
    it('should create recurrences for weekly events', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly Meeting',
        start: Temporal.ZonedDateTime.from('2024-02-05T10:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T11:00:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Berlin',
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const recurrences = createRecurrencesForEvent(
        $app,
        calendarEvent,
        calendarEvent._getForeignProperties().rrule as string,
        range
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-12T10:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-12T11:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].start).toEqual(Temporal.ZonedDateTime.from('2024-02-19T10:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].end).toEqual(Temporal.ZonedDateTime.from('2024-02-19T11:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[2].start).toEqual(Temporal.ZonedDateTime.from('2024-02-26T10:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[2].end).toEqual(Temporal.ZonedDateTime.from('2024-02-26T11:00:00+01:00[Europe/Berlin]'))
    })

    it('should exclude dates when exdate is provided', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly Meeting',
        start: Temporal.ZonedDateTime.from('2024-02-05T10:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T11:00:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Berlin',
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const exdate = ['20240219T100000']

      const recurrences = createRecurrencesForEvent(
        $app,
        calendarEvent,
        calendarEvent._getForeignProperties().rrule as string,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(2)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-12T10:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-12T11:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].start).toEqual(Temporal.ZonedDateTime.from('2024-02-26T10:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].end).toEqual(Temporal.ZonedDateTime.from('2024-02-26T11:00:00+01:00[Europe/Berlin]'))
      // February 19th should be excluded
    })

    it('should handle multiple exdates', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly Meeting',
        start: Temporal.ZonedDateTime.from('2024-02-05T10:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T11:00:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Berlin',
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const exdate = ['20240212T100000', '20240226T100000']

      const recurrences = createRecurrencesForEvent(
        $app,
        calendarEvent,
        calendarEvent._getForeignProperties().rrule as string,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(1)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-19T10:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-19T11:00:00+01:00[Europe/Berlin]'))
    })
  })

  describe('daily events', () => {
    it('should create recurrences for daily events', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Daily Standup',
        start: Temporal.ZonedDateTime.from('2024-02-05T09:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T09:30:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=DAILY;UNTIL=20240209T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Berlin',
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const recurrences = createRecurrencesForEvent(
        $app,
        calendarEvent,
        calendarEvent._getForeignProperties().rrule as string,
        range
      )

      expect(recurrences).toHaveLength(4)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-06T09:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-06T09:30:00+01:00[Europe/Berlin]'))
      expect(recurrences[3].start).toEqual(Temporal.ZonedDateTime.from('2024-02-09T09:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[3].end).toEqual(Temporal.ZonedDateTime.from('2024-02-09T09:30:00+01:00[Europe/Berlin]'))
    })
  })
})

describe('createRecurrencesForBackgroundEvent', () => {
  describe('weekly background events', () => {
    it('should create recurrences for weekly background events', () => {
      const $app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })

      const backgroundEvent: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-02-05T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:59:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'red',
        },
      }

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const recurrences = createRecurrencesForBackgroundEvent(
        $app,
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-12T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-12T23:59:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].isCopy).toBe(true)
      expect(recurrences[0].style).toEqual(backgroundEvent.style)
      expect(recurrences[1].start).toEqual(Temporal.ZonedDateTime.from('2024-02-19T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].end).toEqual(Temporal.ZonedDateTime.from('2024-02-19T23:59:00+01:00[Europe/Berlin]'))
      expect(recurrences[2].start).toEqual(Temporal.ZonedDateTime.from('2024-02-26T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[2].end).toEqual(Temporal.ZonedDateTime.from('2024-02-26T23:59:00+01:00[Europe/Berlin]'))
    })

    it('should exclude dates when exdate is provided', () => {
      const $app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })

      const backgroundEvent: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-02-05T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:59:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'blue',
        },
      }

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const exdate = ['20240219']

      const recurrences = createRecurrencesForBackgroundEvent(
        $app,
        backgroundEvent,
        backgroundEvent.rrule!,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(2)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-12T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-12T23:59:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].start).toEqual(Temporal.ZonedDateTime.from('2024-02-26T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].end).toEqual(Temporal.ZonedDateTime.from('2024-02-26T23:59:00+01:00[Europe/Berlin]'))
      // February 19th should be excluded
    })

    it('should handle multiple exdates for background events', () => {
      const $app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })

      const backgroundEvent: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-02-05T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:59:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'green',
        },
      }

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const exdate = ['20240212', '20240226']

      const recurrences = createRecurrencesForBackgroundEvent(
        $app,
        backgroundEvent,
        backgroundEvent.rrule!,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(1)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-19T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-19T23:59:00+01:00[Europe/Berlin]'))
    })

    it('should work without exdate parameter (backward compatibility)', () => {
      const backgroundEvent: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-02-05T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:59:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'yellow',
        },
      }

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const $app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })

      const recurrences = createRecurrencesForBackgroundEvent(
        $app,
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-12T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-12T23:59:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].start).toEqual(Temporal.ZonedDateTime.from('2024-02-19T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].end).toEqual(Temporal.ZonedDateTime.from('2024-02-19T23:59:00+01:00[Europe/Berlin]'))
      expect(recurrences[2].start).toEqual(Temporal.ZonedDateTime.from('2024-02-26T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[2].end).toEqual(Temporal.ZonedDateTime.from('2024-02-26T23:59:00+01:00[Europe/Berlin]'))
    })
  })

  describe('daily background events', () => {
    it('should create recurrences for daily background events', () => {
      const $app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })

      const backgroundEvent: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-02-05T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:59:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=DAILY;UNTIL=20240209T235959',
        style: {
          backgroundColor: 'orange',
        },
      }

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const recurrences = createRecurrencesForBackgroundEvent(
        $app,
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(4)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-06T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-06T23:59:00+01:00[Europe/Berlin]'))
      expect(recurrences[3].start).toEqual(Temporal.ZonedDateTime.from('2024-02-09T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[3].end).toEqual(Temporal.ZonedDateTime.from('2024-02-09T23:59:00+01:00[Europe/Berlin]'))
    })
  })

  describe('edge cases', () => {
    it('should return empty array when no recurrences are generated', () => {
      const backgroundEvent: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-02-05T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:59:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=SU;UNTIL=20240206T235959',
        style: {
          backgroundColor: 'purple',
        },
      }

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const $app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })

      const recurrences = createRecurrencesForBackgroundEvent(
        $app,
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(0)
    })

    it('should handle empty exdate array', () => {
      const backgroundEvent: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-02-05T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:59:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'pink',
        },
      }

      const range: DateRange = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-29T23:59:00+01:00[Europe/Berlin]'),
      }

      const exdate: string[] = []

      const $app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })

      const recurrences = createRecurrencesForBackgroundEvent(
        $app,
        backgroundEvent,
        backgroundEvent.rrule!,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-12T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[1].start).toEqual(Temporal.ZonedDateTime.from('2024-02-19T00:00:00+01:00[Europe/Berlin]'))
      expect(recurrences[2].start).toEqual(Temporal.ZonedDateTime.from('2024-02-26T00:00:00+01:00[Europe/Berlin]'))
    })
  })
})
