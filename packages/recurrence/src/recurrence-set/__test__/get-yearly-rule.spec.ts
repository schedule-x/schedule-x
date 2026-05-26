import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime, recurrence } from '../../__test__/test-utils'

describe('Getting yearly recurrences', () => {
  describe('Using FREQ and COUNT', () => {
    it('should return the correct recurrences', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=YEARLY;COUNT=6',
        dtstart: datetime('2024-02-02 06:30'),
        dtend: datetime('2024-02-02 08:00'),
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        recurrence(datetime('2024-02-02 06:30'), datetime('2024-02-02 08:00')),
        recurrence(datetime('2025-02-02 06:30'), datetime('2025-02-02 08:00')),
        recurrence(datetime('2026-02-02 06:30'), datetime('2026-02-02 08:00')),
        recurrence(datetime('2027-02-02 06:30'), datetime('2027-02-02 08:00')),
        recurrence(datetime('2028-02-02 06:30'), datetime('2028-02-02 08:00')),
        recurrence(datetime('2029-02-02 06:30'), datetime('2029-02-02 08:00')),
      ])
    })
    it('should generate yearly recurrences from 2025 excluding 2026', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=YEARLY;COUNT=6',
        dtstart: date('2025-02-02'),
        dtend: date('2025-02-02'),
        exdate: [date('2026-02-02')],
      })

      const expectedRecurrences = [
        recurrence(date('2025-02-02'), date('2025-02-02')),
        recurrence(date('2027-02-02'), date('2027-02-02')),
        recurrence(date('2028-02-02'), date('2028-02-02')),
        recurrence(date('2029-02-02'), date('2029-02-02')),
        recurrence(date('2030-02-02'), date('2030-02-02')),
      ]

      const excluded = recurrence(date('2026-02-02'), date('2026-02-02'))

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual(expectedRecurrences)
      expect(recurrences).toHaveLength(5)
      expect(recurrences).not.toContainEqual(excluded)
    })
  })

  describe('Using FREQ, UNTIL and INTERVAL', () => {
    it('should get every second year for 6 years, starting 2024-08-02 04:47 - 2024-08-02 04:52', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=YEARLY;UNTIL=20300802T045200;INTERVAL=2',
        dtstart: datetime('2024-08-02 04:47'),
        dtend: datetime('2024-08-02 04:52'),
      })

      const recurrences = rset.getRecurrences()

      const expectedRecurrences = [
        recurrence(datetime('2024-08-02 04:47'), datetime('2024-08-02 04:52')),
        recurrence(datetime('2026-08-02 04:47'), datetime('2026-08-02 04:52')),
        recurrence(datetime('2028-08-02 04:47'), datetime('2028-08-02 04:52')),
        recurrence(datetime('2030-08-02 04:47'), datetime('2030-08-02 04:52')),
      ]
      expect(recurrences).toEqual(expectedRecurrences)
    })
    it('should get every third year for 6 years, excluding 2028-05-02', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=YEARLY;UNTIL=20310502T150000;INTERVAL=3',
        dtstart: datetime('2025-05-02 15:00'),
        dtend: datetime('2025-05-02 15:05'),
        exdate: [datetime('2028-05-02 15:00')],
      })

      const recurrences = rset.getRecurrences()

      const expectedRecurrences = [
        recurrence(datetime('2025-05-02 15:00'), datetime('2025-05-02 15:05')),
        recurrence(datetime('2031-05-02 15:00'), datetime('2031-05-02 15:05')),
      ]

      expect(recurrences).toEqual(expectedRecurrences)
      expect(recurrences).toHaveLength(2)
      expect(recurrences).not.toContainEqual(
        recurrence(datetime('2028-05-02 15:00'), datetime('2028-05-02 15:05'))
      )
    })
  })
})
