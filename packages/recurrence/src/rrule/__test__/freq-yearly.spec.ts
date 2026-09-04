import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RRuleOptionsExternal } from '../types/rrule-options'
import { RRuleFreq } from '../enums/rrule-freq'
import { RRule } from '../rrule'
import { date, datetime, recurrence } from '../../__test__/test-utils'

describe('RRule', () => {
  describe('Getting yearly recurrences', () => {
    it('should return the 21st of March each year for 5 years, starting in 2024', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.YEARLY,
        until: date('2028-03-21'),
      }

      const result = new RRule(options, date('2024-03-21')).getRecurrences()

      expect(result).toEqual([
        recurrence(date('2024-03-21'), date('2024-03-21')),
        recurrence(date('2025-03-21'), date('2025-03-21')),
        recurrence(date('2026-03-21'), date('2026-03-21')),
        recurrence(date('2027-03-21'), date('2027-03-21')),
        recurrence(date('2028-03-21'), date('2028-03-21')),
      ])
    })

    it('should return the 31st of December 23:30-23:45 each year for 10 years', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.YEARLY,
        until: datetime('2033-12-31 23:45'),
      }

      const result = new RRule(
        options,
        datetime('2024-12-31 23:30'),
        datetime('2024-12-31 23:45')
      ).getRecurrences()

      expect(result).toEqual([
        recurrence(datetime('2024-12-31 23:30'), datetime('2024-12-31 23:45')),
        recurrence(datetime('2025-12-31 23:30'), datetime('2025-12-31 23:45')),
        recurrence(datetime('2026-12-31 23:30'), datetime('2026-12-31 23:45')),
        recurrence(datetime('2027-12-31 23:30'), datetime('2027-12-31 23:45')),
        recurrence(datetime('2028-12-31 23:30'), datetime('2028-12-31 23:45')),
        recurrence(datetime('2029-12-31 23:30'), datetime('2029-12-31 23:45')),
        recurrence(datetime('2030-12-31 23:30'), datetime('2030-12-31 23:45')),
        recurrence(datetime('2031-12-31 23:30'), datetime('2031-12-31 23:45')),
        recurrence(datetime('2032-12-31 23:30'), datetime('2032-12-31 23:45')),
        recurrence(datetime('2033-12-31 23:30'), datetime('2033-12-31 23:45')),
      ])
    })

    it('should return US Thanksgiving (4th Thursday of November) from 2025 to 2030', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.YEARLY,
        bymonth: 11,
        byday: ['4TH'],
        until: datetime('2030-11-28 15:00'),
      }

      const result = new RRule(
        options,
        datetime('2025-11-27 12:00'),
        datetime('2025-11-27 15:00')
      ).getRecurrences()

      expect(result).toEqual([
        recurrence(datetime('2025-11-27 12:00'), datetime('2025-11-27 15:00')),
        recurrence(datetime('2026-11-26 12:00'), datetime('2026-11-26 15:00')),
        recurrence(datetime('2027-11-25 12:00'), datetime('2027-11-25 15:00')),
        recurrence(datetime('2028-11-23 12:00'), datetime('2028-11-23 15:00')),
        recurrence(datetime('2029-11-22 12:00'), datetime('2029-11-22 15:00')),
        recurrence(datetime('2030-11-28 12:00'), datetime('2030-11-28 15:00')),
      ])
    })

    it('should return Memorial Day (last Monday of May) for multiple years', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.YEARLY,
          byday: ['-1MO'],
          bymonth: 5,
          count: 5,
        },
        datetime('2024-05-27 09:00'),
        datetime('2024-05-27 17:00')
      )

      const recurrences = rrule.getRecurrences()

      expect(recurrences).toEqual([
        recurrence(datetime('2024-05-27 09:00'), datetime('2024-05-27 17:00')),
        recurrence(datetime('2025-05-26 09:00'), datetime('2025-05-26 17:00')),
        recurrence(datetime('2026-05-25 09:00'), datetime('2026-05-25 17:00')),
        recurrence(datetime('2027-05-31 09:00'), datetime('2027-05-31 17:00')),
        recurrence(datetime('2028-05-29 09:00'), datetime('2028-05-29 17:00')),
      ])
    })
  })
})
