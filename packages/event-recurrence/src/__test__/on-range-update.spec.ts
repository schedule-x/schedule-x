import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'

describe('limiting infinite events to the current calendar range', () => {
  describe('when rendering the calendar in month view', () => {
    it('should limit an infinite event with weekly frequency', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly event',
        start: '2025-01-14 16:00',
        end: '2025-01-14 17:00',
        rrule: 'FREQ=WEEKLY;BYDAY=TU;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: '2025-01-04',
        defaultView: 'month-grid',
      })

      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(3)
    })

    it('should limit an infinite event with daily frequency', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Daily event',
        start: '2025-01-14 16:00',
        end: '2025-01-14 17:00',
        rrule: 'FREQ=DAILY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: '2025-01-04',
        defaultView: 'month-grid',
      })

      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(20)
    })

    it('should limit an infinite event with monthly frequency', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Monthly event',
        start: '2025-01-14 16:00',
        end: '2025-01-14 17:00',
        rrule: 'FREQ=MONTHLY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: '2025-01-04',
        defaultView: 'month-grid',
      })

      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(1)
    })
  })

  describe('updating from month-view to week view', () => {
    it('should limit an infinite event with daily frequency', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Daily event',
        start: '2025-01-14 16:00',
        end: '2025-01-14 17:00',
        rrule: 'FREQ=DAILY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: '2025-01-14',
        defaultView: 'month-grid',
      })

      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      let events = $app.calendarEvents.list.value
      expect(events).toHaveLength(20)

      eventRecurrencePlugin.onRangeUpdate!({
        start: '2025-01-13 00:00',
        end: '2025-01-19 23:59',
      })

      events = $app.calendarEvents.list.value
      expect(events).toHaveLength(6)
    })
  })
})
