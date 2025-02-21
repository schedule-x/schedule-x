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
      eventRecurrencePlugin.beforeRender!($app)

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
      eventRecurrencePlugin.beforeRender!($app)

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
      eventRecurrencePlugin.beforeRender!($app)

      expect(() =>
        eventRecurrencePlugin.updateRecurrenceDND(
          '16567',
          '2024-02-04 16:00',
          '2024-02-05 18:00'
        )
      ).toThrowError('Tried to update a non-existing event')
    })
  })

  /** method needed for the resource scheduler */
  describe('updating only the rrule and then creating recurrences again', () => {
    it('should update the rrule and create new recurrences', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        start: '2025-02-21 16:00',
        end: '2025-02-21 17:00',
        rrule: 'FREQ=DAILY;UNTIL=20250225',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        defaultView: 'month-grid',
      })
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      const event1 = $app.calendarEvents.list.value[0]
      expect(event1.start).toEqual(eventWithRRule.start)
      expect(event1.end).toEqual(eventWithRRule.end)
      const event2 = $app.calendarEvents.list.value[1]
      expect(event2.start).toEqual('2025-02-22 16:00')
      expect(event2.end).toEqual('2025-02-22 17:00')
      const event3 = $app.calendarEvents.list.value[2]
      expect(event3.start).toEqual('2025-02-23 16:00')
      expect(event3.end).toEqual('2025-02-23 17:00')
      const event4 = $app.calendarEvents.list.value[3]
      expect(event4.start).toEqual('2025-02-24 16:00')
      expect(event4.end).toEqual('2025-02-24 17:00')

      const result = eventRecurrencePlugin.addDaysToRRuleForEvent(
        eventWithRRule.id,
        2
      )

      expect(result).toEqual('FREQ=DAILY;UNTIL=20250227')
    })

    it('should throw error if trying to update event that does not exist', () => {
      const $app = __createAppWithViews__()
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      expect(() =>
        eventRecurrencePlugin.addDaysToRRuleForEvent('16567', 2)
      ).toThrowError(
        'Tried to update rrule for non-existing event with id: 16567'
      )
    })

    it('should throw error if no rrule is found for the event', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        start: '2025-02-21 16:00',
        end: '2025-02-21 17:00',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        defaultView: 'month-grid',
      })
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      expect(() =>
        eventRecurrencePlugin.addDaysToRRuleForEvent('1', 2)
      ).toThrowError(
        'Tried to update rrule for event with id: 1, but no rrule was found'
      )
    })
  })
})
