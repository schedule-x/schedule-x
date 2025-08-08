import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RRuleOptionsExternal } from '../types/rrule-options'
import { RRuleFreq } from '../enums/rrule-freq'
import { RRule } from '../rrule'

describe('RRule', () => {
  describe('Getting yearly recurrences', () => {
    it('should return the 21st of March each year for 5 years, starting in 2024', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.YEARLY,
        until: '2028-03-21',
      }

      const result = new RRule(options, '2024-03-21').getRecurrences()

      expect(result).toEqual([
        { start: '2024-03-21', end: '2024-03-21' },
        { start: '2025-03-21', end: '2025-03-21' },
        { start: '2026-03-21', end: '2026-03-21' },
        { start: '2027-03-21', end: '2027-03-21' },
        { start: '2028-03-21', end: '2028-03-21' },
      ])
    })

    it('should return the 31st of December 23:30-23:45 each year for 10 years', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.YEARLY,
        until: '2033-12-31 23:45',
      }

      const result = new RRule(
        options,
        '2024-12-31 23:30',
        '2024-12-31 23:45'
      ).getRecurrences()

      expect(result).toEqual([
        { start: '2024-12-31 23:30', end: '2024-12-31 23:45' },
        { start: '2025-12-31 23:30', end: '2025-12-31 23:45' },
        { start: '2026-12-31 23:30', end: '2026-12-31 23:45' },
        { start: '2027-12-31 23:30', end: '2027-12-31 23:45' },
        { start: '2028-12-31 23:30', end: '2028-12-31 23:45' },
        { start: '2029-12-31 23:30', end: '2029-12-31 23:45' },
        { start: '2030-12-31 23:30', end: '2030-12-31 23:45' },
        { start: '2031-12-31 23:30', end: '2031-12-31 23:45' },
        { start: '2032-12-31 23:30', end: '2032-12-31 23:45' },
        { start: '2033-12-31 23:30', end: '2033-12-31 23:45' },
      ])
    })
  })
})
