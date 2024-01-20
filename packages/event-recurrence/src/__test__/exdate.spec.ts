import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { RRValues } from '../utils/stateful/recurrence-set-builder'
import { createEventRecurrencePlugin } from '../event-recurrence.plugin'

describe('EventRecurrencePlugin', () => {
  describe('Using exdate to exclude dates from recurrence', () => {
    it('Should create a 4 week recurrence but exclude the third week', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-15',
            end: '2024-01-15',
            rrule: {
              freq: RRValues.WEEKLY,
              byweekday: [RRValues.MO],
              until: '2024-02-05',
            },
            exdate: ['2024-01-29'],
          },
        ],
      })
      expect($app.calendarEvents.list.value.length).toBe(1)

      createEventRecurrencePlugin().init($app)

      expect($app.calendarEvents.list.value.length).toBe(3)
      expect($app.calendarEvents.list.value[0].start).toBe('2024-01-15')
      expect($app.calendarEvents.list.value[0].end).toBe('2024-01-15')
      expect($app.calendarEvents.list.value[1].start).toBe('2024-01-22')
      expect($app.calendarEvents.list.value[1].end).toBe('2024-01-22')
      expect($app.calendarEvents.list.value[2].start).toBe('2024-02-05')
      expect($app.calendarEvents.list.value[2].end).toBe('2024-02-05')
    })

    it('should create a monthly recurrence of 12 months but exclude the 3rd and 5th month', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-15',
            end: '2024-01-15',
            rrule: {
              freq: RRValues.MONTHLY,
              bymonthday: [15],
              until: '2024-12-15',
            },
            exdate: ['2024-03-15', '2024-05-15'],
          },
        ],
      })
      expect($app.calendarEvents.list.value.length).toBe(1)

      createEventRecurrencePlugin().init($app)

      expect($app.calendarEvents.list.value.length).toBe(10)
      expect($app.calendarEvents.list.value[0].start).toBe('2024-01-15')
      expect($app.calendarEvents.list.value[0].end).toBe('2024-01-15')
      expect($app.calendarEvents.list.value[1].start).toBe('2024-02-15')
      expect($app.calendarEvents.list.value[1].end).toBe('2024-02-15')
      expect($app.calendarEvents.list.value[2].start).toBe('2024-04-15')
      expect($app.calendarEvents.list.value[2].end).toBe('2024-04-15')
      expect($app.calendarEvents.list.value[3].start).toBe('2024-06-15')
      expect($app.calendarEvents.list.value[3].end).toBe('2024-06-15')
      expect($app.calendarEvents.list.value[4].start).toBe('2024-07-15')
      expect($app.calendarEvents.list.value[4].end).toBe('2024-07-15')
      expect($app.calendarEvents.list.value[5].start).toBe('2024-08-15')
      expect($app.calendarEvents.list.value[5].end).toBe('2024-08-15')
      expect($app.calendarEvents.list.value[6].start).toBe('2024-09-15')
      expect($app.calendarEvents.list.value[6].end).toBe('2024-09-15')
      expect($app.calendarEvents.list.value[7].start).toBe('2024-10-15')
      expect($app.calendarEvents.list.value[7].end).toBe('2024-10-15')
      expect($app.calendarEvents.list.value[8].start).toBe('2024-11-15')
      expect($app.calendarEvents.list.value[8].end).toBe('2024-11-15')
      expect($app.calendarEvents.list.value[9].start).toBe('2024-12-15')
      expect($app.calendarEvents.list.value[9].end).toBe('2024-12-15')
    })
  })
})
