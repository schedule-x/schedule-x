import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'

describe('infinite recurring event expansion', () => {
  describe('detection of infinite events', () => {
    it('should detect weekly infinite event (no COUNT, no UNTIL)', () => {
      const eventWithInfiniteRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly infinite event',
        start: Temporal.ZonedDateTime.from('2025-01-13T09:00:00Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-13T10:00:00Z[UTC]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
      }

      const $app = __createAppWithViews__({
        events: [eventWithInfiniteRRule],
        selectedDate: Temporal.PlainDate.from('2025-01-13'),
        defaultView: 'month-grid',
      })

      const plugin = createEventRecurrencePlugin()
      plugin.beforeRender!($app)

      // Should expand beyond the one-month range (at least 1 year from event start)
      const events = $app.calendarEvents.list.value
      const lastEvent = events[events.length - 1]

      // Event starts on 2025-01-13, so should expand at least to 2026-01-13
      expect(lastEvent.start.toString()).toContain('2026')
    })

    it('should detect monthly infinite event (no COUNT, no UNTIL)', () => {
      const eventWithInfiniteRRule: CalendarEventExternal = {
        id: '1',
        title: 'Monthly infinite event',
        start: Temporal.ZonedDateTime.from('2025-01-12T18:00:00Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-12T19:00:00Z[UTC]'),
        rrule: 'FREQ=MONTHLY;BYDAY=2SU',
      }

      const $app = __createAppWithViews__({
        events: [eventWithInfiniteRRule],
        selectedDate: Temporal.PlainDate.from('2025-01-12'),
        defaultView: 'month-grid',
      })

      const plugin = createEventRecurrencePlugin()
      plugin.beforeRender!($app)

      // Should expand beyond the one-month range
      const events = $app.calendarEvents.list.value
      const lastEvent = events[events.length - 1]

      // Event starts on 2025-01-12, so should expand at least to 2026-01-12
      expect(lastEvent.start.toString()).toContain('2026')
    })

    it('should detect yearly infinite event (no COUNT, no UNTIL)', () => {
      const eventWithInfiniteRRule: CalendarEventExternal = {
        id: '1',
        title: 'Yearly infinite event',
        start: Temporal.ZonedDateTime.from('2025-06-15T10:00:00Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-06-17T18:00:00Z[UTC]'),
        rrule: 'FREQ=YEARLY',
      }

      const $app = __createAppWithViews__({
        events: [eventWithInfiniteRRule],
        selectedDate: Temporal.PlainDate.from('2025-06-15'),
        defaultView: 'month-grid',
      })

      const plugin = createEventRecurrencePlugin()
      plugin.beforeRender!($app)

      // Should expand beyond the one-month range (at least 10 years from event start)
      const events = $app.calendarEvents.list.value
      const lastEvent = events[events.length - 1]

      // Event starts on 2025-06-15, so should expand at least to 2035-06-15
      expect(lastEvent.start.toString()).toContain('2035')
    })

    it('should NOT expand finite event with COUNT', () => {
      const eventWithCount: CalendarEventExternal = {
        id: '1',
        title: 'Finite weekly event with COUNT',
        start: Temporal.ZonedDateTime.from('2025-01-13T09:00:00Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-13T10:00:00Z[UTC]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=10',
      }

      const $app = __createAppWithViews__({
        events: [eventWithCount],
        selectedDate: Temporal.PlainDate.from('2025-01-13'),
        defaultView: 'month-grid',
      })

      const plugin = createEventRecurrencePlugin()
      plugin.beforeRender!($app)

      // Should only expand within the COUNT limit (10 occurrences)
      const events = $app.calendarEvents.list.value
      expect(events.length).toBeLessThanOrEqual(10)

      // Last event should be within the COUNT limit, not expanded to next year
      const lastEvent = events[events.length - 1]
      expect(lastEvent.start.toString()).not.toContain('2026')
    })

    it('should NOT expand finite event with UNTIL', () => {
      const eventWithUntil: CalendarEventExternal = {
        id: '1',
        title: 'Finite weekly event with UNTIL',
        start: Temporal.ZonedDateTime.from('2025-01-13T09:00:00Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-13T10:00:00Z[UTC]'),
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20250301T000000Z',
      }

      const $app = __createAppWithViews__({
        events: [eventWithUntil],
        selectedDate: Temporal.PlainDate.from('2025-01-13'),
        defaultView: 'month-grid',
      })

      const plugin = createEventRecurrencePlugin()
      plugin.beforeRender!($app)

      // Should only expand until the UNTIL date (March 2025)
      const events = $app.calendarEvents.list.value
      const lastEvent = events[events.length - 1]

      // Last event should not exceed the UNTIL date
      const lastEventDate = lastEvent.start.toString()
      expect(lastEventDate).not.toContain('2026')
      expect(lastEventDate).toContain('2025')
    })
  })
})
