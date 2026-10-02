import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime, recurrence } from '../../__test__/test-utils'

describe('Getting weekly recurrences', () => {
  describe('Using freq and until', () => {
    it('should return all Fridays from February through March 2024', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=FR;UNTIL=20240331',
        dtstart: datetime('2024-02-02 06:30'),
        dtend: datetime('2024-02-02 08:00'),
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        recurrence(datetime('2024-02-02 06:30'), datetime('2024-02-02 08:00')),
        recurrence(datetime('2024-02-09 06:30'), datetime('2024-02-09 08:00')),
        recurrence(datetime('2024-02-16 06:30'), datetime('2024-02-16 08:00')),
        recurrence(datetime('2024-02-23 06:30'), datetime('2024-02-23 08:00')),
        recurrence(datetime('2024-03-01 06:30'), datetime('2024-03-01 08:00')),
        recurrence(datetime('2024-03-08 06:30'), datetime('2024-03-08 08:00')),
        recurrence(datetime('2024-03-15 06:30'), datetime('2024-03-15 08:00')),
        recurrence(datetime('2024-03-22 06:30'), datetime('2024-03-22 08:00')),
        recurrence(datetime('2024-03-29 06:30'), datetime('2024-03-29 08:00')),
      ])
    })

    it('should return all Saturdays and Sundays in February 2024', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=SA,SU;UNTIL=20240229',
        dtstart: date('2024-02-03'),
        dtend: date('2024-02-03'),
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        recurrence(date('2024-02-03'), date('2024-02-03')),
        recurrence(date('2024-02-04'), date('2024-02-04')),
        recurrence(date('2024-02-10'), date('2024-02-10')),
        recurrence(date('2024-02-11'), date('2024-02-11')),
        recurrence(date('2024-02-17'), date('2024-02-17')),
        recurrence(date('2024-02-18'), date('2024-02-18')),
        recurrence(date('2024-02-24'), date('2024-02-24')),
        recurrence(date('2024-02-25'), date('2024-02-25')),
      ])
    })
    it('should return 4 fridays in May, excluding 2025-05-30', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=FR;UNTIL=20250531',
        dtstart: date('2025-05-01'),
        dtend: date('2025-05-01'),
        exdate: [date('2025-05-30')],
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        recurrence(date('2025-05-02'), date('2025-05-02')),
        recurrence(date('2025-05-09'), date('2025-05-09')),
        recurrence(date('2025-05-16'), date('2025-05-16')),
        recurrence(date('2025-05-23'), date('2025-05-23')),
      ])
      expect(recurrences).not.toContainEqual(
        recurrence(date('2025-05-30'), date('2025-05-30'))
      )
      expect(recurrences).toHaveLength(4)
    })
  })
  describe('Using freq, byday and count', () => {
    it('should return 3 Mondays in May 2025, excluding 2025-05-12', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=4',
        dtstart: datetime('2025-05-01 01:00'),
        dtend: datetime('2025-05-01 02:00'),
        exdate: [datetime('2025-05-12 01:00')],
      })

      const recurrences = rset.getRecurrences()

      const expectedRecurrences = [
        recurrence(datetime('2025-05-05 01:00'), datetime('2025-05-05 02:00')),
        recurrence(datetime('2025-05-19 01:00'), datetime('2025-05-19 02:00')),
        recurrence(datetime('2025-05-26 01:00'), datetime('2025-05-26 02:00')),
      ]

      expect(recurrences).toEqual(expectedRecurrences)
      expect(recurrences).not.toContainEqual(
        recurrence(datetime('2025-05-12 01:00'), datetime('2025-05-12 02:00'))
      )
      expect(recurrences).toHaveLength(3)
    })
  })
})
