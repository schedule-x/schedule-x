import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { EventRRule, RRValues } from '../utils/stateful/event-rrule'
import { createEventRecurrencePlugin } from '../event-recurrence.plugin'

describe('EventRecurrencePlugin', () => {
  describe('Creating events with weekly recurrence', () => {
    it('should create an event with 4 recurrences over 4 weeks', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-15',
            end: '2024-01-16',
            rrule: new EventRRule({
              freq: RRValues.WEEKLY,
              byweekday: [RRValues.MO],
              until: '2024-02-05',
            }),
          },
        ],
      })
      expect($app.calendarEvents.list.value.length).toBe(1)

      createEventRecurrencePlugin().init($app)

      expect($app.calendarEvents.list.value.length).toBe(4)
      expect($app.calendarEvents.list.value[0].start).toBe('2024-01-15')
      expect($app.calendarEvents.list.value[0].end).toBe('2024-01-16')
      expect($app.calendarEvents.list.value[1].start).toBe('2024-01-22')
      expect($app.calendarEvents.list.value[1].end).toBe('2024-01-23')
      expect($app.calendarEvents.list.value[2].start).toBe('2024-01-29')
      expect($app.calendarEvents.list.value[2].end).toBe('2024-01-30')
      expect($app.calendarEvents.list.value[3].start).toBe('2024-02-05')
      expect($app.calendarEvents.list.value[3].end).toBe('2024-02-06')
    })

    it('should create an event with 8 recurrences over 4 weeks', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-15',
            end: '2024-01-15',
            rrule: new EventRRule({
              freq: RRValues.WEEKLY,
              byweekday: [RRValues.MO, RRValues.WE],
              until: '2024-02-07',
            }),
          },
        ],
      })
      expect($app.calendarEvents.list.value.length).toBe(1)

      createEventRecurrencePlugin().init($app)

      expect($app.calendarEvents.list.value.length).toBe(8)

      expect($app.calendarEvents.list.value[0].start).toBe('2024-01-15')
      expect($app.calendarEvents.list.value[0].end).toBe('2024-01-15')

      expect($app.calendarEvents.list.value[1].start).toBe('2024-01-17')
      expect($app.calendarEvents.list.value[1].end).toBe('2024-01-17')

      expect($app.calendarEvents.list.value[2].start).toBe('2024-01-22')
      expect($app.calendarEvents.list.value[2].end).toBe('2024-01-22')

      expect($app.calendarEvents.list.value[3].start).toBe('2024-01-24')
      expect($app.calendarEvents.list.value[3].end).toBe('2024-01-24')

      expect($app.calendarEvents.list.value[4].start).toBe('2024-01-29')
      expect($app.calendarEvents.list.value[4].end).toBe('2024-01-29')

      expect($app.calendarEvents.list.value[5].start).toBe('2024-01-31')
      expect($app.calendarEvents.list.value[5].end).toBe('2024-01-31')

      expect($app.calendarEvents.list.value[6].start).toBe('2024-02-05')
      expect($app.calendarEvents.list.value[6].end).toBe('2024-02-05')

      expect($app.calendarEvents.list.value[7].start).toBe('2024-02-07')
      expect($app.calendarEvents.list.value[7].end).toBe('2024-02-07')
    })
  })

  describe('Creating timed recurring events with weekly recurrence', () => {
    it('should create an event with 4 recurrences over 4 weeks', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-15 10:00',
            end: '2024-01-15 11:00',
            rrule: new EventRRule({
              freq: RRValues.WEEKLY,
              byweekday: [RRValues.MO],
              until: '2024-02-05 10:00',
            }),
          },
        ],
      })
      expect($app.calendarEvents.list.value.length).toBe(1)

      createEventRecurrencePlugin().init($app)

      expect($app.calendarEvents.list.value.length).toBe(4)
      expect($app.calendarEvents.list.value[0].start).toBe('2024-01-15 10:00')
      expect($app.calendarEvents.list.value[0].end).toBe('2024-01-15 11:00')
      expect($app.calendarEvents.list.value[1].start).toBe('2024-01-22 10:00')
      expect($app.calendarEvents.list.value[1].end).toBe('2024-01-22 11:00')
      expect($app.calendarEvents.list.value[2].start).toBe('2024-01-29 10:00')
      expect($app.calendarEvents.list.value[2].end).toBe('2024-01-29 11:00')
      expect($app.calendarEvents.list.value[3].start).toBe('2024-02-05 10:00')
      expect($app.calendarEvents.list.value[3].end).toBe('2024-02-05 11:00')
    })
  })
})
