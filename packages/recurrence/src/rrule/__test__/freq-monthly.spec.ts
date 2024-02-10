/* eslint-disable max-lines */
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
  })
})
