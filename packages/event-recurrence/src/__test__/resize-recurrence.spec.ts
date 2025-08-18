import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'

describe('Resize Recurrence', () => {
  describe('Updating a timed event', () => {
    it('should update an event by setting the end to 2 hours later', () => {
      const event: CalendarEventExternal = {
        id: 1,
        start: Temporal.ZonedDateTime.from('2024-02-05T21:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T22:00:00.00+00:00[UTC]'),
        rrule: 'FREQ=WEEKLY;COUNT=10',
      }
      const $app = __createAppWithViews__({
        events: [event],
      })
      const recurrencePlugin = createEventRecurrencePlugin()
      recurrencePlugin.beforeRender!($app)

      recurrencePlugin.updateRecurrenceOnResize(
        1,
        Temporal.ZonedDateTime.from('2024-02-05T22:00:00.00+00:00[UTC]'),
        Temporal.ZonedDateTime.from('2024-02-05T23:00:00.00+00:00[UTC]')
      )

      const updatedEvent = $app.calendarEvents.list.value.find(
        (e) => e.id === 1
      )
      expect(updatedEvent?._getExternalEvent()).toEqual({
        id: 1,
        start: Temporal.ZonedDateTime.from('2024-02-05T21:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T23:00:00.00+00:00[UTC]'),
        rrule: 'FREQ=WEEKLY;COUNT=10',
      })
    })
  })

  describe('Updating an all-day event', () => {
    it('should update an event by setting the end to 1 day later', () => {
      const event: CalendarEventExternal = {
        id: 1,
        start: Temporal.PlainDate.from('2024-02-05'),
        end: Temporal.PlainDate.from('2024-02-06'),
        rrule: 'FREQ=WEEKLY;COUNT=10',
      }
      const $app = __createAppWithViews__({
        events: [event],
      })
      const recurrencePlugin = createEventRecurrencePlugin()
      recurrencePlugin.beforeRender!($app)

      recurrencePlugin.updateRecurrenceOnResize(
        1,
        Temporal.ZonedDateTime.from('2024-02-06T00:00:00.00+00:00[UTC]'),
        Temporal.ZonedDateTime.from('2024-02-07T00:00:00.00+00:00[UTC]')
      )

      const updatedEvent = $app.calendarEvents.list.value.find(
        (e) => e.id === 1
      )
      expect(updatedEvent?._getExternalEvent()).toEqual({
        id: 1,
        start: Temporal.PlainDate.from('2024-02-05'),
        end: Temporal.PlainDate.from('2024-02-07'),
        rrule: 'FREQ=WEEKLY;COUNT=10',
      })
    })
  })

  describe('Trying to update a non-existing event', () => {
    it('should throw an error', () => {
      const $app = __createAppWithViews__()
      const recurrencePlugin = createEventRecurrencePlugin()
      recurrencePlugin.beforeRender!($app)

      expect(() => {
        recurrencePlugin.updateRecurrenceOnResize(
          1,
          Temporal.PlainDate.from('2024-02-06'),
          Temporal.PlainDate.from('2024-02-07')
        )
      }).toThrowError('Tried to update a non-existing event')
    })
  })
})
