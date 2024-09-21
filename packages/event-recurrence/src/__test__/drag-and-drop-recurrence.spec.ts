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
        start: '2024-02-04 16:00',
        end: '2024-02-04 17:00',
        rrule: 'FREQ=WEEKLY;BYDAY=SU;UNTIL=20240229T235959',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
      })
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.onRender!($app)

      eventRecurrencePlugin.updateRecurrenceDND(
        eventWithRRule.id,
        '2024-02-04 16:00',
        '2024-02-05 18:00'
      )

      const updatedEvent = $app.calendarEvents.list.value.find(
        (event) => event.id === eventWithRRule.id
      )
      if (!updatedEvent) throw new Error('Event not found')

      expect(updatedEvent.start).toEqual('2024-02-05 18:00')
      expect(updatedEvent.end).toEqual('2024-02-05 19:00')
      expect(updatedEvent._getForeignProperties().rrule).toEqual(
        'FREQ=WEEKLY;UNTIL=20240302T015900;BYDAY=MO'
      )
    })
  })

  describe('Dragging an event to 3 days earlier', () => {
    it('should update the event start, end and rrule', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        start: '2024-02-04 16:00',
        end: '2024-02-04 17:00',
        rrule: 'FREQ=WEEKLY;BYDAY=SU,MO;UNTIL=20240229T235959',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
      })
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.onRender!($app)

      // Drag the second occurrence of the event to 3 days earlier
      eventRecurrencePlugin.updateRecurrenceDND(
        eventWithRRule.id,
        '2024-02-11 16:00',
        '2024-02-08 16:00'
      )

      const updatedEvent = $app.calendarEvents.list.value.find(
        (event) => event.id === eventWithRRule.id
      )
      if (!updatedEvent) throw new Error('Event not found')

      expect(updatedEvent.start).toEqual('2024-02-01 16:00')
      expect(updatedEvent.end).toEqual('2024-02-01 17:00')
      expect(updatedEvent._getForeignProperties().rrule).toEqual(
        'FREQ=WEEKLY;UNTIL=20240226T235900;BYDAY=TH,FR'
      )
    })
  })

  describe('Trying to update a non-existing event', () => {
    it('should throw an error', () => {
      const $app = __createAppWithViews__()
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.onRender!($app)

      expect(() =>
        eventRecurrencePlugin.updateRecurrenceDND(
          '16567',
          '2024-02-04 16:00',
          '2024-02-05 18:00'
        )
      ).toThrowError('Tried to update a non-existing event')
    })
  })
})
