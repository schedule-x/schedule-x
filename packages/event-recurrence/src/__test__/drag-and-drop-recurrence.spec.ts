import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'

describe('Drag and drop recurring events', () => {
  describe('Dragging an event to 1 day and 2 hours later', () => {
    it('should update the event start, end and rrule', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        start: Temporal.ZonedDateTime.from(
          '2024-02-04T16:00:00+03:00[Europe/Moscow]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2024-02-04T17:00:00+03:00[Europe/Moscow]'
        ),
        rrule: 'FREQ=WEEKLY;BYDAY=SU;UNTIL=20240229T235959',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Moscow',
      })
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      eventRecurrencePlugin.updateRecurrenceDND(
        eventWithRRule.id,
        Temporal.ZonedDateTime.from('2024-02-04T16:00:00+03:00[Europe/Moscow]'),
        Temporal.ZonedDateTime.from('2024-02-05T18:00:00+03:00[Europe/Moscow]')
      )

      const updatedEvent = $app.calendarEvents.list.value.find(
        (event) => event.id === eventWithRRule.id
      )
      if (!updatedEvent) throw new Error('Event not found')

      expect(updatedEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-05T18:00:00+03:00[Europe/Moscow]')
      )
      expect(updatedEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-05T19:00:00+03:00[Europe/Moscow]')
      )
      expect(updatedEvent._getForeignProperties().rrule).toEqual(
        'FREQ=WEEKLY;UNTIL=20240302T015900;BYDAY=MO'
      )
    })
  })

  describe('Dragging an event to 3 days earlier', () => {
    it('should update the event start, end and rrule', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        start: Temporal.ZonedDateTime.from(
          '2024-02-04T16:00:00+03:00[Europe/Moscow]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2024-02-04T17:00:00+03:00[Europe/Moscow]'
        ),
        rrule: 'FREQ=WEEKLY;BYDAY=SU,MO;UNTIL=20240229T235959',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Moscow',
      })
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      // Drag the second occurrence of the event to 3 days earlier
      eventRecurrencePlugin.updateRecurrenceDND(
        eventWithRRule.id,
        Temporal.ZonedDateTime.from('2024-02-11T16:00:00+03:00[Europe/Moscow]'),
        Temporal.ZonedDateTime.from('2024-02-08T16:00:00+03:00[Europe/Moscow]')
      )

      const updatedEvent = $app.calendarEvents.list.value.find(
        (event) => event.id === eventWithRRule.id
      )
      if (!updatedEvent) throw new Error('Event not found')

      expect(updatedEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-01T16:00:00+03:00[Europe/Moscow]')
      )
      expect(updatedEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-01T17:00:00+03:00[Europe/Moscow]')
      )
      expect(updatedEvent._getForeignProperties().rrule).toEqual(
        'FREQ=WEEKLY;UNTIL=20240226T235900;BYDAY=TH,FR'
      )
    })
  })

  describe('Trying to update a non-existing event', () => {
    it('should throw an error', () => {
      const $app = __createAppWithViews__({
        timezone: 'Europe/Moscow',
      })
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      expect(() =>
        eventRecurrencePlugin.updateRecurrenceDND(
          '16567',
          Temporal.ZonedDateTime.from(
            '2024-02-04T16:00:00+03:00[Europe/Moscow]'
          ),
          Temporal.ZonedDateTime.from(
            '2024-02-05T18:00:00+03:00[Europe/Moscow]'
          )
        )
      ).toThrowError('Tried to update a non-existing event')
    })
  })
})
