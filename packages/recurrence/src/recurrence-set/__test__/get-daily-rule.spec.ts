import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Getting daily recurrences', () => {
  describe('Using FREQ, COUNT and INTERVAL', () => {
    it('should return the correct recurrences', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=DAILY;COUNT=6;INTERVAL=2',
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
          start: '2024-02-04 06:30',
          end: '2024-02-04 08:00',
        },
        {
          start: '2024-02-06 06:30',
          end: '2024-02-06 08:00',
        },
        {
          start: '2024-02-08 06:30',
          end: '2024-02-08 08:00',
        },
        {
          start: '2024-02-10 06:30',
          end: '2024-02-10 08:00',
        },
        {
          start: '2024-02-12 06:30',
          end: '2024-02-12 08:00',
        },
      ])
    })
  })

  describe('Using FREQ, UNTIL and INTERVAL', () => {
    it('should return the correct recurrences', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=DAILY;UNTIL=20240212T063000;INTERVAL=2',
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
          start: '2024-02-04 06:30',
          end: '2024-02-04 08:00',
        },
        {
          start: '2024-02-06 06:30',
          end: '2024-02-06 08:00',
        },
        {
          start: '2024-02-08 06:30',
          end: '2024-02-08 08:00',
        },
        {
          start: '2024-02-10 06:30',
          end: '2024-02-10 08:00',
        },
        {
          start: '2024-02-12 06:30',
          end: '2024-02-12 08:00',
        },
      ])
    })
  })

  describe('Using FREQ, BYDAY and INTERVAL', () => {
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
