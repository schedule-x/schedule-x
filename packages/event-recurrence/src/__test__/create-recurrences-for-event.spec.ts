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
        start: '2024-02-05 10:00',
        end: '2024-02-05 11:00',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const recurrences = createRecurrencesForEvent(
        $app,
        calendarEvent,
        calendarEvent._getForeignProperties().rrule as string,
        range
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toBe('2024-02-12 10:00')
      expect(recurrences[0].end).toBe('2024-02-12 11:00')
      expect(recurrences[1].start).toBe('2024-02-19 10:00')
      expect(recurrences[1].end).toBe('2024-02-19 11:00')
      expect(recurrences[2].start).toBe('2024-02-26 10:00')
      expect(recurrences[2].end).toBe('2024-02-26 11:00')
    })

    it('should exclude dates when exdate is provided', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly Meeting',
        start: '2024-02-05 10:00',
        end: '2024-02-05 11:00',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
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
      expect(recurrences[0].start).toBe('2024-02-12 10:00')
      expect(recurrences[0].end).toBe('2024-02-12 11:00')
      expect(recurrences[1].start).toBe('2024-02-26 10:00')
      expect(recurrences[1].end).toBe('2024-02-26 11:00')
      // February 19th should be excluded
    })

    it('should handle multiple exdates', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly Meeting',
        start: '2024-02-05 10:00',
        end: '2024-02-05 11:00',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
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
      expect(recurrences[0].start).toBe('2024-02-19 10:00')
      expect(recurrences[0].end).toBe('2024-02-19 11:00')
    })
  })

  describe('daily events', () => {
    it('should create recurrences for daily events', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Daily Standup',
        start: '2024-02-05 09:00',
        end: '2024-02-05 09:30',
        rrule: 'FREQ=DAILY;UNTIL=20240209T235959',
      }

      $app = __createAppWithViews__({
        events: [eventWithRRule],
      })

      const calendarEvent = $app.calendarEvents.list
        .value[0] as CalendarEventInternal

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const recurrences = createRecurrencesForEvent(
        $app,
        calendarEvent,
        calendarEvent._getForeignProperties().rrule as string,
        range
      )

      expect(recurrences).toHaveLength(4)
      expect(recurrences[0].start).toBe('2024-02-06 09:00')
      expect(recurrences[0].end).toBe('2024-02-06 09:30')
      expect(recurrences[3].start).toBe('2024-02-09 09:00')
      expect(recurrences[3].end).toBe('2024-02-09 09:30')
    })
  })
})

describe('createRecurrencesForBackgroundEvent', () => {
  describe('weekly background events', () => {
    it('should create recurrences for weekly background events', () => {
      const backgroundEvent: BackgroundEvent = {
        start: '2024-02-05',
        end: '2024-02-05',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'red',
        },
      }

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const recurrences = createRecurrencesForBackgroundEvent(
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toBe('2024-02-12')
      expect(recurrences[0].end).toBe('2024-02-12')
      expect(recurrences[0].isCopy).toBe(true)
      expect(recurrences[0].style).toEqual(backgroundEvent.style)
      expect(recurrences[1].start).toBe('2024-02-19')
      expect(recurrences[1].end).toBe('2024-02-19')
      expect(recurrences[2].start).toBe('2024-02-26')
      expect(recurrences[2].end).toBe('2024-02-26')
    })

    it('should exclude dates when exdate is provided', () => {
      const backgroundEvent: BackgroundEvent = {
        start: '2024-02-05',
        end: '2024-02-05',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'blue',
        },
      }

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const exdate = ['20240219']

      const recurrences = createRecurrencesForBackgroundEvent(
        backgroundEvent,
        backgroundEvent.rrule!,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(2)
      expect(recurrences[0].start).toBe('2024-02-12')
      expect(recurrences[0].end).toBe('2024-02-12')
      expect(recurrences[1].start).toBe('2024-02-26')
      expect(recurrences[1].end).toBe('2024-02-26')
      // February 19th should be excluded
    })

    it('should handle multiple exdates for background events', () => {
      const backgroundEvent: BackgroundEvent = {
        start: '2024-02-05',
        end: '2024-02-05',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'green',
        },
      }

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const exdate = ['20240212', '20240226']

      const recurrences = createRecurrencesForBackgroundEvent(
        backgroundEvent,
        backgroundEvent.rrule!,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(1)
      expect(recurrences[0].start).toBe('2024-02-19')
      expect(recurrences[0].end).toBe('2024-02-19')
    })

    it('should work without exdate parameter (backward compatibility)', () => {
      const backgroundEvent: BackgroundEvent = {
        start: '2024-02-05',
        end: '2024-02-05',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'yellow',
        },
      }

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const recurrences = createRecurrencesForBackgroundEvent(
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toBe('2024-02-12')
      expect(recurrences[0].end).toBe('2024-02-12')
      expect(recurrences[1].start).toBe('2024-02-19')
      expect(recurrences[1].end).toBe('2024-02-19')
      expect(recurrences[2].start).toBe('2024-02-26')
      expect(recurrences[2].end).toBe('2024-02-26')
    })
  })

  describe('daily background events', () => {
    it('should create recurrences for daily background events', () => {
      const backgroundEvent: BackgroundEvent = {
        start: '2024-02-05',
        end: '2024-02-05',
        rrule: 'FREQ=DAILY;UNTIL=20240209T235959',
        style: {
          backgroundColor: 'orange',
        },
      }

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const recurrences = createRecurrencesForBackgroundEvent(
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(4)
      expect(recurrences[0].start).toBe('2024-02-06')
      expect(recurrences[0].end).toBe('2024-02-06')
      expect(recurrences[3].start).toBe('2024-02-09')
      expect(recurrences[3].end).toBe('2024-02-09')
    })
  })

  describe('edge cases', () => {
    it('should return empty array when no recurrences are generated', () => {
      const backgroundEvent: BackgroundEvent = {
        start: '2024-02-05',
        end: '2024-02-05',
        rrule: 'FREQ=WEEKLY;BYDAY=SU;UNTIL=20240206T235959',
        style: {
          backgroundColor: 'purple',
        },
      }

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const recurrences = createRecurrencesForBackgroundEvent(
        backgroundEvent,
        backgroundEvent.rrule!,
        range
      )

      expect(recurrences).toHaveLength(0)
    })

    it('should handle empty exdate array', () => {
      const backgroundEvent: BackgroundEvent = {
        start: '2024-02-05',
        end: '2024-02-05',
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240226T235959',
        style: {
          backgroundColor: 'pink',
        },
      }

      const range: DateRange = {
        start: '2024-02-01 00:00',
        end: '2024-02-29 23:59',
      }

      const exdate: string[] = []

      const recurrences = createRecurrencesForBackgroundEvent(
        backgroundEvent,
        backgroundEvent.rrule!,
        range,
        exdate
      )

      expect(recurrences).toHaveLength(3)
      expect(recurrences[0].start).toBe('2024-02-12')
      expect(recurrences[1].start).toBe('2024-02-19')
      expect(recurrences[2].start).toBe('2024-02-26')
    })
  })
})
