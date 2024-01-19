import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RRValues } from '../utils/stateful/event-rrule'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createEventRecurrencePlugin } from '../event-recurrence.plugin'

describe('EventRecurrencePlugin', () => {
  describe('Monthly recurrence', () => {
    it('should create 12 events over 6 months', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-15',
            end: '2024-01-16',
            rrule: {
              freq: RRValues.MONTHLY,
              bymonthday: [15, 25],
              until: '2024-06-25',
            },
          },
        ],
      })
      expect($app.calendarEvents.list.value.length).toBe(1)

      createEventRecurrencePlugin().init($app)

      expect($app.calendarEvents.list.value.length).toBe(12)

      expect($app.calendarEvents.list.value[0].start).toBe('2024-01-15')
      expect($app.calendarEvents.list.value[0].end).toBe('2024-01-16')
      expect($app.calendarEvents.list.value[1].start).toBe('2024-01-25')
      expect($app.calendarEvents.list.value[1].end).toBe('2024-01-26')

      expect($app.calendarEvents.list.value[2].start).toBe('2024-02-15')
      expect($app.calendarEvents.list.value[2].end).toBe('2024-02-16')
      expect($app.calendarEvents.list.value[3].start).toBe('2024-02-25')
      expect($app.calendarEvents.list.value[3].end).toBe('2024-02-26')

      expect($app.calendarEvents.list.value[4].start).toBe('2024-03-15')
      expect($app.calendarEvents.list.value[4].end).toBe('2024-03-16')
      expect($app.calendarEvents.list.value[5].start).toBe('2024-03-25')
      expect($app.calendarEvents.list.value[5].end).toBe('2024-03-26')

      expect($app.calendarEvents.list.value[6].start).toBe('2024-04-15')
      expect($app.calendarEvents.list.value[6].end).toBe('2024-04-16')
      expect($app.calendarEvents.list.value[7].start).toBe('2024-04-25')
      expect($app.calendarEvents.list.value[7].end).toBe('2024-04-26')

      expect($app.calendarEvents.list.value[8].start).toBe('2024-05-15')
      expect($app.calendarEvents.list.value[8].end).toBe('2024-05-16')
      expect($app.calendarEvents.list.value[9].start).toBe('2024-05-25')
      expect($app.calendarEvents.list.value[9].end).toBe('2024-05-26')

      expect($app.calendarEvents.list.value[10].start).toBe('2024-06-15')
      expect($app.calendarEvents.list.value[10].end).toBe('2024-06-16')
      expect($app.calendarEvents.list.value[11].start).toBe('2024-06-25')
      expect($app.calendarEvents.list.value[11].end).toBe('2024-06-26')
    })
  })
})
