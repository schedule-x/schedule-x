import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

describe('expanding infinite events beyond the current calendar range', () => {
  describe('when rendering the calendar in month view', () => {
    it('should expand an infinite event with weekly frequency to at least 1 year', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly event',
        start: Temporal.ZonedDateTime.from('2025-01-14T16:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-14T17:00:00.00+00:00[UTC]'),
        rrule: 'FREQ=WEEKLY;BYDAY=TU;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: Temporal.PlainDate.from('2025-01-04'),
        defaultView: 'month-grid',
      })

      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      // Should expand beyond the month range - at least 1 year (52+ weeks)
      expect(events.length).toBeGreaterThanOrEqual(50)
    })

    it('should expand an infinite event with daily frequency to at least 1 year', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Daily event',
        start: Temporal.ZonedDateTime.from('2025-01-14T16:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-14T17:00:00.00+00:00[UTC]'),
        rrule: 'FREQ=DAILY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: Temporal.PlainDate.from('2025-01-04'),
        defaultView: 'month-grid',
      })

      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      // Should expand beyond the month range - at least 1 year (365+ days)
      expect(events.length).toBeGreaterThanOrEqual(365)
    })

    it('should expand an infinite event with monthly frequency to at least 1 year', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Monthly event',
        start: Temporal.ZonedDateTime.from('2025-01-14T16:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-14T17:00:00.00+00:00[UTC]'),
        rrule: 'FREQ=MONTHLY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: Temporal.PlainDate.from('2025-01-04'),
        defaultView: 'month-grid',
      })

      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      // Should expand beyond the month range - at least 1 year (12+ months)
      expect(events.length).toBeGreaterThanOrEqual(12)
    })
  })

  describe('updating from month-view to week view', () => {
    it('should still expand an infinite event with daily frequency when range updates', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Daily event',
        start: Temporal.ZonedDateTime.from('2025-01-14T16:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-14T17:00:00.00+00:00[UTC]'),
        rrule: 'FREQ=DAILY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: Temporal.PlainDate.from('2025-01-14'),
        defaultView: 'month-grid',
      })

      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      let events = $app.calendarEvents.list.value
      // Should be expanded to at least 1 year
      expect(events.length).toBeGreaterThanOrEqual(365)

      eventRecurrencePlugin.onRangeUpdate!({
        start: Temporal.ZonedDateTime.from('2025-01-13T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-19T23:59:00.00+00:00[UTC]'),
      })

      events = $app.calendarEvents.list.value
      // Should still be expanded to at least 1 year (infinite events are expanded based on event start, not range)
      expect(events.length).toBeGreaterThanOrEqual(365)
    })
  })
})

describe('expanding infinite background events beyond the current calendar range', () => {
  describe('when rendering the calendar in month view', () => {
    it('should expand an infinite background event with weekly frequency to at least 1 year', () => {
      const backgroundEventWithRRule: BackgroundEvent = {
        start: Temporal.PlainDate.from('2025-02-12'),
        end: Temporal.PlainDate.from('2025-02-12'),
        rrule: 'FREQ=WEEKLY;BYDAY=WE,FR;INTERVAL=2;',
        style: {
          backgroundColor: 'red',
        },
      }
      const $app = __createAppWithViews__({
        backgroundEvents: [backgroundEventWithRRule],
        selectedDate: Temporal.PlainDate.from('2025-02-01'),
        defaultView: 'month-grid',
      })

      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      const backgroundEvents = $app.calendarEvents.backgroundEvents.value
      // Should expand beyond the month range - at least 1 year (52+ weeks / 2 interval = 26+ occurrences, with 2 days per week = 52+ events)
      expect(backgroundEvents.length).toBeGreaterThanOrEqual(50)
      const firstEvent = backgroundEvents[0]
      expect(firstEvent.start).toEqual(Temporal.PlainDate.from('2025-02-12'))
      expect(firstEvent.end).toEqual(Temporal.PlainDate.from('2025-02-12'))
      const secondEvent = backgroundEvents[1]
      expect(secondEvent.start).toEqual(Temporal.PlainDate.from('2025-02-14'))
      expect(secondEvent.end).toEqual(Temporal.PlainDate.from('2025-02-14'))
      const thirdEvent = backgroundEvents[2]
      expect(thirdEvent.start).toEqual(Temporal.PlainDate.from('2025-02-26'))
      expect(thirdEvent.end).toEqual(Temporal.PlainDate.from('2025-02-26'))
      const fourthEvent = backgroundEvents[3]
      expect(fourthEvent.start).toEqual(Temporal.PlainDate.from('2025-02-28'))
      expect(fourthEvent.end).toEqual(Temporal.PlainDate.from('2025-02-28'))

      eventRecurrencePlugin.onRangeUpdate!({
        start: Temporal.ZonedDateTime.from('2025-03-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-03-31T23:59:00.00+00:00[UTC]'),
      })

      const updatedBackgroundEvents = $app.calendarEvents.backgroundEvents.value
      // Should still be expanded beyond the month range
      expect(updatedBackgroundEvents.length).toBeGreaterThanOrEqual(8)
      const fifthEvent = updatedBackgroundEvents[4]
      expect(fifthEvent.start).toEqual(Temporal.PlainDate.from('2025-03-12'))
      expect(fifthEvent.end).toEqual(Temporal.PlainDate.from('2025-03-12'))
      const sixthEvent = updatedBackgroundEvents[5]
      expect(sixthEvent.start).toEqual(Temporal.PlainDate.from('2025-03-14'))
      expect(sixthEvent.end).toEqual(Temporal.PlainDate.from('2025-03-14'))
      const seventhEvent = updatedBackgroundEvents[6]
      expect(seventhEvent.start).toEqual(Temporal.PlainDate.from('2025-03-26'))
      expect(seventhEvent.end).toEqual(Temporal.PlainDate.from('2025-03-26'))
      const eighthEvent = updatedBackgroundEvents[7]
      expect(eighthEvent.start).toEqual(Temporal.PlainDate.from('2025-03-28'))
      expect(eighthEvent.end).toEqual(Temporal.PlainDate.from('2025-03-28'))
    })
  })
})
