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

describe('limiting infinite events to the current calendar range', () => {
  describe('when rendering the calendar in month view', () => {
    it('should limit an infinite event with weekly frequency', () => {
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
      expect(events).toHaveLength(3)
    })

    it('should limit an infinite event with daily frequency', () => {
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
      expect(events).toHaveLength(20)
    })

    it('should limit an infinite event with monthly frequency', () => {
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
      expect(events).toHaveLength(1)
    })
  })

  describe('updating from month-view to week view', () => {
    it('should limit an infinite event with daily frequency', () => {
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
      expect(events).toHaveLength(20)

      eventRecurrencePlugin.onRangeUpdate!({
        start: Temporal.ZonedDateTime.from('2025-01-13T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-19T23:59:00.00+00:00[UTC]'),
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
        start: Temporal.ZonedDateTime.from('2025-02-12T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-02-12T23:59:00.00+00:00[UTC]'),
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
      expect(backgroundEvents).toHaveLength(4)
      const firstEvent = backgroundEvents[0]
      expect(firstEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-02-12T00:00:00.00+00:00[UTC]')
      )
      expect(firstEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-02-12T23:59:00.00+00:00[UTC]')
      )
      const secondEvent = backgroundEvents[1]
      expect(secondEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-02-14T00:00:00.00+00:00[UTC]')
      )
      expect(secondEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-02-14T23:59:00.00+00:00[UTC]')
      )
      const thirdEvent = backgroundEvents[2]
      expect(thirdEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-02-26T00:00:00.00+00:00[UTC]')
      )
      expect(thirdEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-02-26T23:59:00.00+00:00[UTC]')
      )
      const fourthEvent = backgroundEvents[3]
      expect(fourthEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-02-28T00:00:00.00+00:00[UTC]')
      )
      expect(fourthEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-02-28T23:59:00.00+00:00[UTC]')
      )

      eventRecurrencePlugin.onRangeUpdate!({
        start: Temporal.ZonedDateTime.from('2025-03-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-03-31T23:59:00.00+00:00[UTC]'),
      })

      const updatedBackgroundEvents = $app.calendarEvents.backgroundEvents.value
      expect(updatedBackgroundEvents).toHaveLength(8)
      const fifthEvent = updatedBackgroundEvents[4]
      expect(fifthEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-03-12T00:00:00.00+00:00[UTC]')
      )
      expect(fifthEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-03-12T23:59:00.00+00:00[UTC]')
      )
      const sixthEvent = updatedBackgroundEvents[5]
      expect(sixthEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-03-14T00:00:00.00+00:00[UTC]')
      )
      expect(sixthEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-03-14T23:59:00.00+00:00[UTC]')
      )
      const seventhEvent = updatedBackgroundEvents[6]
      expect(seventhEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-03-26T00:00:00.00+00:00[UTC]')
      )
      expect(seventhEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-03-26T23:59:00.00+00:00[UTC]')
      )
      const eighthEvent = updatedBackgroundEvents[7]
      expect(eighthEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2025-03-28T00:00:00.00+00:00[UTC]')
      )
      expect(eighthEvent.end).toEqual(
        Temporal.ZonedDateTime.from('2025-03-28T23:59:00.00+00:00[UTC]')
      )
    })
  })
})
