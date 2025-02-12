/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

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

describe('limiting infinite background events to the current calendar range', () => {
  describe('when rendering the calendar in month view', () => {
    it('should limit an infinite background event with weekly frequency', () => {
      const backgroundEventWithRRule: BackgroundEvent = {
        start: '2025-02-12',
        end: '2025-02-12',
        rrule: 'FREQ=WEEKLY;BYDAY=WE,FR;INTERVAL=2;',
        style: {
          backgroundColor: 'red',
        },
      }
      const $app = __createAppWithViews__({
        backgroundEvents: [backgroundEventWithRRule],
        selectedDate: '2025-02-01',
        defaultView: 'month-grid',
      })

      const eventRecurrencePlugin = createEventRecurrencePlugin()
      eventRecurrencePlugin.beforeRender!($app)

      const backgroundEvents = $app.calendarEvents.backgroundEvents.value
      expect(backgroundEvents).toHaveLength(4)
      const firstEvent = backgroundEvents[0]
      expect(firstEvent.start).toBe('2025-02-12')
      expect(firstEvent.end).toBe('2025-02-12')
      const secondEvent = backgroundEvents[1]
      expect(secondEvent.start).toBe('2025-02-14')
      expect(secondEvent.end).toBe('2025-02-14')
      const thirdEvent = backgroundEvents[2]
      expect(thirdEvent.start).toBe('2025-02-26')
      expect(thirdEvent.end).toBe('2025-02-26')
      const fourthEvent = backgroundEvents[3]
      expect(fourthEvent.start).toBe('2025-02-28')
      expect(fourthEvent.end).toBe('2025-02-28')

      eventRecurrencePlugin.onRangeUpdate!({
        start: '2025-03-01 00:00',
        end: '2025-03-31 23:59',
      })

      const updatedBackgroundEvents = $app.calendarEvents.backgroundEvents.value
      expect(updatedBackgroundEvents).toHaveLength(8)
      const fifthEvent = updatedBackgroundEvents[4]
      expect(fifthEvent.start).toBe('2025-03-12')
      expect(fifthEvent.end).toBe('2025-03-12')
      const sixthEvent = updatedBackgroundEvents[5]
      expect(sixthEvent.start).toBe('2025-03-14')
      expect(sixthEvent.end).toBe('2025-03-14')
      const seventhEvent = updatedBackgroundEvents[6]
      expect(seventhEvent.start).toBe('2025-03-26')
      expect(seventhEvent.end).toBe('2025-03-26')
      const eighthEvent = updatedBackgroundEvents[7]
      expect(eighthEvent.start).toBe('2025-03-28')
    })
  })
})
