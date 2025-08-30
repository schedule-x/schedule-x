import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { vi } from 'vitest'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

describe('validateRrule', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleWarnSpy.mockRestore()
  })

  describe('BYMONTHDAY validation', () => {
    describe('for regular events', () => {
      it('should return true when event day matches BYMONTHDAY', () => {
        const eventWithRRule: CalendarEventExternal = {
          id: '1',
          title: 'Monthly event',
          start: Temporal.PlainDate.from('2025-01-01'),
          end: Temporal.PlainDate.from('2025-01-01'),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=1;COUNT=12',
        }
        const $app = __createAppWithViews__({
          events: [eventWithRRule],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).not.toHaveBeenCalled()
        // When validation passes, recurrences are created, so we expect more than 1 event
        expect($app.calendarEvents.list.value.length).toBeGreaterThan(1)
      })

      it('should return true when event day matches BYMONTHDAY with ZonedDateTime', () => {
        const eventWithRRule: CalendarEventExternal = {
          id: '2',
          title: 'Monthly event',
          start: Temporal.ZonedDateTime.from(
            '2025-01-15T10:00:00+01:00[Europe/Berlin]'
          ),
          end: Temporal.ZonedDateTime.from(
            '2025-01-15T11:00:00+01:00[Europe/Berlin]'
          ),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=12',
        }
        const $app = __createAppWithViews__({
          events: [eventWithRRule],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).not.toHaveBeenCalled()
        // When validation passes, recurrences are created, so we expect more than 1 event
        expect($app.calendarEvents.list.value.length).toBeGreaterThan(1)
      })

      it('should return false and log warning when event day does not match BYMONTHDAY', () => {
        const eventWithRRule: CalendarEventExternal = {
          id: '3',
          title: 'Monthly event',
          start: Temporal.PlainDate.from('2025-01-08'),
          end: Temporal.PlainDate.from('2025-01-08'),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=1;COUNT=12',
        }
        const $app = __createAppWithViews__({
          events: [eventWithRRule],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "[Schedule-X warning]: Recurrence set could not be created for event with id 3, because rrule pattern doesn't match event.start"
        )
        expect($app.calendarEvents.list.value).toHaveLength(1) // Only the original event, no recurrences
      })

      it('should return false and log warning when event day does not match BYMONTHDAY with ZonedDateTime', () => {
        const eventWithRRule: CalendarEventExternal = {
          id: '4',
          title: 'Monthly event',
          start: Temporal.ZonedDateTime.from(
            '2025-01-20T10:00:00+01:00[Europe/Berlin]'
          ),
          end: Temporal.ZonedDateTime.from(
            '2025-01-20T11:00:00+01:00[Europe/Berlin]'
          ),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=12',
        }
        const $app = __createAppWithViews__({
          events: [eventWithRRule],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "[Schedule-X warning]: Recurrence set could not be created for event with id 4, because rrule pattern doesn't match event.start"
        )
        expect($app.calendarEvents.list.value).toHaveLength(1) // Only the original event, no recurrences
      })
    })

    describe('for background events', () => {
      it('should return true when event day matches BYMONTHDAY', () => {
        const backgroundEvent: BackgroundEvent = {
          title: 'Monthly background event',
          start: Temporal.PlainDate.from('2025-01-01'),
          end: Temporal.PlainDate.from('2025-01-01'),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=1;COUNT=12',
          style: { backgroundColor: 'red' },
        }
        const $app = __createAppWithViews__({
          backgroundEvents: [backgroundEvent],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).not.toHaveBeenCalled()
        // When validation passes, recurrences are created, so we expect more than 1 event
        expect(
          $app.calendarEvents.backgroundEvents.value.length
        ).toBeGreaterThan(1)
      })

      it('should return true when event day matches BYMONTHDAY with ZonedDateTime', () => {
        const backgroundEvent: BackgroundEvent = {
          title: 'Monthly background event',
          start: Temporal.ZonedDateTime.from(
            '2025-01-15T10:00:00+01:00[Europe/Berlin]'
          ),
          end: Temporal.ZonedDateTime.from(
            '2025-01-15T11:00:00+01:00[Europe/Berlin]'
          ),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=12',
          style: { backgroundColor: 'red' },
        }
        const $app = __createAppWithViews__({
          backgroundEvents: [backgroundEvent],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).not.toHaveBeenCalled()
        // When validation passes, recurrences are created, so we expect more than 1 event
        expect(
          $app.calendarEvents.backgroundEvents.value.length
        ).toBeGreaterThan(1)
      })

      it('should return false and log warning when event day does not match BYMONTHDAY', () => {
        const backgroundEvent: BackgroundEvent = {
          title: 'Monthly background event',
          start: Temporal.PlainDate.from('2025-01-08'),
          end: Temporal.PlainDate.from('2025-01-08'),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=1;COUNT=12',
          style: { backgroundColor: 'red' },
        }
        const $app = __createAppWithViews__({
          backgroundEvents: [backgroundEvent],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "[Schedule-X warning]: Recurrence set could not be created for background event with start 2025-01-08, because rrule pattern doesn't match event.start"
        )
        expect($app.calendarEvents.backgroundEvents.value).toHaveLength(1) // Only the original event, no recurrences
      })

      it('should return false and log warning when event day does not match BYMONTHDAY with ZonedDateTime', () => {
        const backgroundEvent: BackgroundEvent = {
          title: 'Monthly background event',
          start: Temporal.ZonedDateTime.from(
            '2025-01-20T10:00:00+01:00[Europe/Berlin]'
          ),
          end: Temporal.ZonedDateTime.from(
            '2025-01-20T11:00:00+01:00[Europe/Berlin]'
          ),
          rrule: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=12',
          style: { backgroundColor: 'red' },
        }
        const $app = __createAppWithViews__({
          backgroundEvents: [backgroundEvent],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "[Schedule-X warning]: Recurrence set could not be created for background event with start 2025-01-20T10:00:00+01:00[Europe/Berlin], because rrule pattern doesn't match event.start"
        )
        expect($app.calendarEvents.backgroundEvents.value).toHaveLength(1) // Only the original event, no recurrences
      })
    })

    describe('when BYMONTHDAY is not present', () => {
      it('should return true for regular events without BYMONTHDAY', () => {
        const eventWithRRule: CalendarEventExternal = {
          id: '5',
          title: 'Weekly event',
          start: Temporal.PlainDate.from('2025-01-01'),
          end: Temporal.PlainDate.from('2025-01-01'),
          rrule: 'FREQ=WEEKLY;COUNT=4',
        }
        const $app = __createAppWithViews__({
          events: [eventWithRRule],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).not.toHaveBeenCalled()
        // When validation passes, recurrences are created, so we expect more than 1 event
        expect($app.calendarEvents.list.value.length).toBeGreaterThan(1)
      })

      it('should return true for background events without BYMONTHDAY', () => {
        const backgroundEvent: BackgroundEvent = {
          title: 'Weekly background event',
          start: Temporal.PlainDate.from('2025-01-01'),
          end: Temporal.PlainDate.from('2025-01-01'),
          rrule: 'FREQ=WEEKLY;COUNT=4',
          style: { backgroundColor: 'red' },
        }
        const $app = __createAppWithViews__({
          backgroundEvents: [backgroundEvent],
        })

        createEventRecurrencePlugin().beforeRender!($app)

        expect(consoleWarnSpy).not.toHaveBeenCalled()
        // When validation passes, recurrences are created, so we expect more than 1 event
        expect(
          $app.calendarEvents.backgroundEvents.value.length
        ).toBeGreaterThan(1)
      })
    })
  })
})
