import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'

describe('Creating recurrences for events', () => {
  describe('For a weekly event', () => {
    it('should create recurrence for all Sundays in February 2024', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly event',
        start: '2024-02-04 16:00',
        end: '2024-02-04 17:00',
        rrule: 'FREQ=WEEKLY;BYDAY=SU;UNTIL=20240229T235959',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
      })

      createEventRecurrencePlugin().init($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(4)
      expect(events[0].start).toEqual('2024-02-04 16:00')
      expect(events[0].end).toEqual('2024-02-04 17:00')
      expect(events[1].start).toEqual('2024-02-11 16:00')
      expect(events[1].end).toEqual('2024-02-11 17:00')
      expect(events[2].start).toEqual('2024-02-18 16:00')
      expect(events[2].end).toEqual('2024-02-18 17:00')
      expect(events[3].start).toEqual('2024-02-25 16:00')
      expect(events[3].end).toEqual('2024-02-25 17:00')
    })
  })
})
