import 'temporal-polyfill/global'
import {
  describe,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RRule } from '../rrule'
import { RRuleFreq } from '../enums/rrule-freq'
import { expect } from 'vitest'

describe('RRule', () => {
  describe('Getting monthly recurrences', () => {
    it('should return the 15th of every month in 2024', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          bymonthday: 15,
          until: '2024-12-31',
        },
        '2024-01-15 08:15',
        '2024-01-15 09:00'
      )

      const recurrences = rrule.getRecurrences()

      const expectedRecurrences = [
        {
          start: '2024-01-15 08:15',
          end: '2024-01-15 09:00',
        },
        {
          start: '2024-02-15 08:15',
          end: '2024-02-15 09:00',
        },
        {
          start: '2024-03-15 08:15',
          end: '2024-03-15 09:00',
        },
        {
          start: '2024-04-15 08:15',
          end: '2024-04-15 09:00',
        },
        {
          start: '2024-05-15 08:15',
          end: '2024-05-15 09:00',
        },
        {
          start: '2024-06-15 08:15',
          end: '2024-06-15 09:00',
        },
        {
          start: '2024-07-15 08:15',
          end: '2024-07-15 09:00',
        },
        {
          start: '2024-08-15 08:15',
          end: '2024-08-15 09:00',
        },
        {
          start: '2024-09-15 08:15',
          end: '2024-09-15 09:00',
        },
        {
          start: '2024-10-15 08:15',
          end: '2024-10-15 09:00',
        },
        {
          start: '2024-11-15 08:15',
          end: '2024-11-15 09:00',
        },
        {
          start: '2024-12-15 08:15',
          end: '2024-12-15 09:00',
        },
      ]

      const monthsInYear = 12
      expect(recurrences).toHaveLength(monthsInYear)
      expect(recurrences).toEqual(expectedRecurrences)
    })

    it('should return the 31st of every month that has that date in 2024', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          bymonthday: 31,
          until: '2024-12-31 08:15',
        },
        '2024-01-31 08:15',
        '2024-01-31 09:00'
      )

      const recurrences = rrule.getRecurrences()

      const expectedRecurrences = [
        {
          start: '2024-01-31 08:15',
          end: '2024-01-31 09:00',
        },
        {
          start: '2024-03-31 08:15',
          end: '2024-03-31 09:00',
        },
        {
          start: '2024-05-31 08:15',
          end: '2024-05-31 09:00',
        },
        {
          start: '2024-07-31 08:15',
          end: '2024-07-31 09:00',
        },
        {
          start: '2024-08-31 08:15',
          end: '2024-08-31 09:00',
        },
        {
          start: '2024-10-31 08:15',
          end: '2024-10-31 09:00',
        },
        {
          start: '2024-12-31 08:15',
          end: '2024-12-31 09:00',
        },
      ]

      expect(recurrences).toEqual(expectedRecurrences)
    })

    it('should get the 27th of every second month in 2024 and 2025', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          interval: 2,
          until: '2025-12-31',
        },
        '2024-01-27 08:15',
        '2024-01-27 09:00'
      )

      const recurrences = rrule.getRecurrences()

      const expectedRecurrences = [
        {
          start: '2024-01-27 08:15',
          end: '2024-01-27 09:00',
        },
        {
          start: '2024-03-27 08:15',
          end: '2024-03-27 09:00',
        },
        {
          start: '2024-05-27 08:15',
          end: '2024-05-27 09:00',
        },
        {
          start: '2024-07-27 08:15',
          end: '2024-07-27 09:00',
        },
        {
          start: '2024-09-27 08:15',
          end: '2024-09-27 09:00',
        },
        {
          start: '2024-11-27 08:15',
          end: '2024-11-27 09:00',
        },
        {
          start: '2025-01-27 08:15',
          end: '2025-01-27 09:00',
        },
        {
          start: '2025-03-27 08:15',
          end: '2025-03-27 09:00',
        },
        {
          start: '2025-05-27 08:15',
          end: '2025-05-27 09:00',
        },
        {
          start: '2025-07-27 08:15',
          end: '2025-07-27 09:00',
        },
        {
          start: '2025-09-27 08:15',
          end: '2025-09-27 09:00',
        },
        {
          start: '2025-11-27 08:15',
          end: '2025-11-27 09:00',
        },
      ]
      expect(recurrences).toHaveLength(12)
      expect(recurrences).toEqual(expectedRecurrences)
    })

    it('should return the first Monday of each month starting August 2025 for 12 months', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          byday: ['1MO'],
          count: 12,
        },
        '2025-08-04 09:00',
        '2025-08-04 10:00'
      )

      const recurrences = rrule.getRecurrences()

      const expectedRecurrences = [
        {
          start: '2025-08-04 09:00',
          end: '2025-08-04 10:00',
        },
        {
          start: '2025-09-01 09:00',
          end: '2025-09-01 10:00',
        },
        {
          start: '2025-10-06 09:00',
          end: '2025-10-06 10:00',
        },
        {
          start: '2025-11-03 09:00',
          end: '2025-11-03 10:00',
        },
        {
          start: '2025-12-01 09:00',
          end: '2025-12-01 10:00',
        },
        {
          start: '2026-01-05 09:00',
          end: '2026-01-05 10:00',
        },
        {
          start: '2026-02-02 09:00',
          end: '2026-02-02 10:00',
        },
        {
          start: '2026-03-02 09:00',
          end: '2026-03-02 10:00',
        },
        {
          start: '2026-04-06 09:00',
          end: '2026-04-06 10:00',
        },
        {
          start: '2026-05-04 09:00',
          end: '2026-05-04 10:00',
        },
        {
          start: '2026-06-01 09:00',
          end: '2026-06-01 10:00',
        },
        {
          start: '2026-07-06 09:00',
          end: '2026-07-06 10:00',
        },
      ]

      expect(recurrences).toHaveLength(12)
      expect(recurrences).toEqual(expectedRecurrences)
    })

    it('should return the last Friday of each month in Q1 2026', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          byday: ['-1FR'],
          count: 3,
        },
        '2026-01-01 15:00',
        '2026-01-01 16:00'
      )

      const recurrences = rrule.getRecurrences()

      const expectedRecurrences = [
        {
          start: '2026-01-30 15:00',
          end: '2026-01-30 16:00',
        },
        {
          start: '2026-02-27 15:00',
          end: '2026-02-27 16:00',
        },
        {
          start: '2026-03-27 15:00',
          end: '2026-03-27 16:00',
        },
      ]

      expect(recurrences).toHaveLength(3)
      expect(recurrences).toEqual(expectedRecurrences)
    })
    it('should return a BYMONTHDAY that is not the day of the start date', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          bymonthday: 2,
          count: 3,
        },
        '2026-01-01 10:00',
        '2026-01-01 11:00'
      )

      expect(rrule.getRecurrences()).toEqual([
        { start: '2026-01-02 10:00', end: '2026-01-02 11:00' },
        { start: '2026-02-02 10:00', end: '2026-02-02 11:00' },
        { start: '2026-03-02 10:00', end: '2026-03-02 11:00' },
      ])
    })

    it('should return the last day of every month for BYMONTHDAY=-1', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          bymonthday: -1,
          count: 3,
        },
        '2026-01-30',
        '2026-01-30'
      )

      expect(rrule.getRecurrences()).toEqual([
        { start: '2026-01-31', end: '2026-01-31' },
        { start: '2026-02-28', end: '2026-02-28' },
        { start: '2026-03-31', end: '2026-03-31' },
      ])
    })

    it('should skip months without the 31st', () => {
      const rrule = new RRule(
        {
          freq: RRuleFreq.MONTHLY,
          bymonthday: 31,
          until: '2026-08-31',
        },
        '2026-01-31',
        '2026-01-31'
      )

      expect(rrule.getRecurrences().map((r) => r.start)).toEqual([
        '2026-01-31',
        '2026-03-31',
        '2026-05-31',
        '2026-07-31',
        '2026-08-31',
      ])
    })
  })
})
