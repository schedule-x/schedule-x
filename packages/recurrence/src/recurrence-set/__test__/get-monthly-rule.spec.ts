import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Getting monthly recurrences', () => {
  describe('Using FREQ and COUNT', () => {
    it('should return the correct recurrences', () => {
      const expectedNumberOfRecurrences = 10
      const rset = new RecurrenceSet({
        rrule: `FREQ=MONTHLY;COUNT=${expectedNumberOfRecurrences}`,
        dtstart: '20240101T103000',
        dtend: '20240101T113000',
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toHaveLength(expectedNumberOfRecurrences)
      expect(recurrences).toEqual([
        {
          start: '2024-01-01 10:30',
          end: '2024-01-01 11:30',
        },
        {
          start: '2024-02-01 10:30',
          end: '2024-02-01 11:30',
        },
        {
          start: '2024-03-01 10:30',
          end: '2024-03-01 11:30',
        },
        {
          start: '2024-04-01 10:30',
          end: '2024-04-01 11:30',
        },
        {
          start: '2024-05-01 10:30',
          end: '2024-05-01 11:30',
        },
        {
          start: '2024-06-01 10:30',
          end: '2024-06-01 11:30',
        },
        {
          start: '2024-07-01 10:30',
          end: '2024-07-01 11:30',
        },
        {
          start: '2024-08-01 10:30',
          end: '2024-08-01 11:30',
        },
        {
          start: '2024-09-01 10:30',
          end: '2024-09-01 11:30',
        },
        {
          start: '2024-10-01 10:30',
          end: '2024-10-01 11:30',
        },
      ])
    })
  })
})
