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
        start: Temporal.ZonedDateTime.from('2024-02-04T16:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-04T17:00:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=SU;UNTIL=20240229T235959',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Berlin',
      })

      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(4)
      expect(events[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-04T16:00:00+01:00[Europe/Berlin]'))
      expect(events[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-04T17:00:00+01:00[Europe/Berlin]'))
      expect(events[1].start).toEqual(Temporal.ZonedDateTime.from('2024-02-11T16:00:00+01:00[Europe/Berlin]'))
      expect(events[1].end).toEqual(Temporal.ZonedDateTime.from('2024-02-11T17:00:00+01:00[Europe/Berlin]'))
      expect(events[2].start).toEqual(Temporal.ZonedDateTime.from('2024-02-18T16:00:00+01:00[Europe/Berlin]'))
      expect(events[2].end).toEqual(Temporal.ZonedDateTime.from('2024-02-18T17:00:00+01:00[Europe/Berlin]'))
      expect(events[3].start).toEqual(Temporal.ZonedDateTime.from('2024-02-25T16:00:00+01:00[Europe/Berlin]'))
      expect(events[3].end).toEqual(Temporal.ZonedDateTime.from('2024-02-25T17:00:00+01:00[Europe/Berlin]'))
    })

    it('should create recurrence for all Saturdays in March 2024', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Weekly event',
        start: Temporal.ZonedDateTime.from('2024-03-02T16:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-03-02T17:00:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=WEEKLY;BYDAY=SA;UNTIL=20240331T235959;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        timezone: 'Europe/Berlin',
      })
      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(5)
      expect(events[0].start).toEqual(Temporal.ZonedDateTime.from('2024-03-02T16:00:00+01:00[Europe/Berlin]'))
      expect(events[0].end).toEqual(Temporal.ZonedDateTime.from('2024-03-02T17:00:00+01:00[Europe/Berlin]'))
      expect(events[1].start).toEqual(Temporal.ZonedDateTime.from('2024-03-09T16:00:00+01:00[Europe/Berlin]'))
      expect(events[1].end).toEqual(Temporal.ZonedDateTime.from('2024-03-09T17:00:00+01:00[Europe/Berlin]'))
      expect(events[2].start).toEqual(Temporal.ZonedDateTime.from('2024-03-16T16:00:00+01:00[Europe/Berlin]'))
      expect(events[2].end).toEqual(Temporal.ZonedDateTime.from('2024-03-16T17:00:00+01:00[Europe/Berlin]'))
      expect(events[3].start).toEqual(Temporal.ZonedDateTime.from('2024-03-23T16:00:00+01:00[Europe/Berlin]'))
      expect(events[3].end).toEqual(Temporal.ZonedDateTime.from('2024-03-23T17:00:00+01:00[Europe/Berlin]'))
      expect(events[4].start).toEqual(Temporal.ZonedDateTime.from('2024-03-30T16:00:00+01:00[Europe/Berlin]'))
      expect(events[4].end).toEqual(Temporal.ZonedDateTime.from('2024-03-30T17:00:00+01:00[Europe/Berlin]'))
    })
  })

  describe('for one monthly event', () => {
    it('should not add recurrence if event start is the only recurrence within the range', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Monthly event',
        start: Temporal.ZonedDateTime.from('2024-02-05T16:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T17:00:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=MONTHLY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: Temporal.PlainDate.from('2024-02-01'),
        timezone: 'Europe/Berlin',
      })
      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(1)
      expect(events[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-05T16:00:00+01:00[Europe/Berlin]'))
      expect(events[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-05T17:00:00+01:00[Europe/Berlin]'))
    })

    it('should create recurrence in the month following the event start', () => {
      const eventWithRRule: CalendarEventExternal = {
        id: '1',
        title: 'Monthly event',
        start: Temporal.ZonedDateTime.from('2024-02-05T16:00:00+01:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2024-02-05T17:00:00+01:00[Europe/Berlin]'),
        rrule: 'FREQ=MONTHLY;',
      }
      const $app = __createAppWithViews__({
        events: [eventWithRRule],
        selectedDate: Temporal.PlainDate.from('2024-03-01'),
        timezone: 'Europe/Berlin',
        defaultView: 'month-grid',
      })
      createEventRecurrencePlugin().beforeRender!($app)

      const events = $app.calendarEvents.list.value
      expect(events).toHaveLength(2)
      expect(events[0].start).toEqual(Temporal.ZonedDateTime.from('2024-02-05T16:00:00+01:00[Europe/Berlin]'))
      expect(events[0].end).toEqual(Temporal.ZonedDateTime.from('2024-02-05T17:00:00+01:00[Europe/Berlin]'))
      expect(events[1].start).toEqual(Temporal.ZonedDateTime.from('2024-03-05T16:00:00+01:00[Europe/Berlin]'))
      expect(events[1].end).toEqual(Temporal.ZonedDateTime.from('2024-03-05T17:00:00+01:00[Europe/Berlin]'))
    })
  })
})
