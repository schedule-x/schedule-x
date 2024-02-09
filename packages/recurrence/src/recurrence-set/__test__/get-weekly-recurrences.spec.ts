import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Getting weekly recurrences', () => {
  describe('Using freq and until', () => {
    it('should return all Fridays from February through March 2024', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=FR;UNTIL=20240331',
        dtstart: '20240202T063000',
        dtend: '20240202T080000',
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        {
          start: '2024-02-02 06:30',
          end: '2024-02-02 08:00',
        },
        {
          start: '2024-02-09 06:30',
          end: '2024-02-09 08:00',
        },
        {
          start: '2024-02-16 06:30',
          end: '2024-02-16 08:00',
        },
        {
          start: '2024-02-23 06:30',
          end: '2024-02-23 08:00',
        },
        {
          start: '2024-03-01 06:30',
          end: '2024-03-01 08:00',
        },
        {
          start: '2024-03-08 06:30',
          end: '2024-03-08 08:00',
        },
        {
          start: '2024-03-15 06:30',
          end: '2024-03-15 08:00',
        },
        {
          start: '2024-03-22 06:30',
          end: '2024-03-22 08:00',
        },
        {
          start: '2024-03-29 06:30',
          end: '2024-03-29 08:00',
        },
      ])
    })

    it('should return all Saturdays and Sundays in February 2024', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=SA,SU;UNTIL=20240229',
        dtstart: '20240203',
        dtend: '20240203',
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        {
          start: '2024-02-03',
          end: '2024-02-03',
        },
        {
          start: '2024-02-04',
          end: '2024-02-04',
        },
        {
          start: '2024-02-10',
          end: '2024-02-10',
        },
        {
          start: '2024-02-11',
          end: '2024-02-11',
        },
        {
          start: '2024-02-17',
          end: '2024-02-17',
        },
        {
          start: '2024-02-18',
          end: '2024-02-18',
        },
        {
          start: '2024-02-24',
          end: '2024-02-24',
        },
        {
          start: '2024-02-25',
          end: '2024-02-25',
        },
      ])
    })
  })
})
