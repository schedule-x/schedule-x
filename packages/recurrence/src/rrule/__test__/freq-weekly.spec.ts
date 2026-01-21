import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { RRule } from '../rrule'
import { RRuleOptionsExternal } from '../types/rrule-options'
import { RRuleFreq } from '../enums/rrule-freq'
import { date, datetime, recurrence } from '../../__test__/test-utils'

describe('RRule', () => {
  describe('getting weekly recurrences with byday option', () => {
    it('should return all Mondays for the month of January 2024', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.WEEKLY,
        byday: ['MO'],
        until: date('2024-01-31'),
      }

      const result = new RRule(options, date('2024-01-01')).getRecurrences()

      expect(result).toEqual([
        recurrence(date('2024-01-01'), date('2024-01-01')),
        recurrence(date('2024-01-08'), date('2024-01-08')),
        recurrence(date('2024-01-15'), date('2024-01-15')),
        recurrence(date('2024-01-22'), date('2024-01-22')),
        recurrence(date('2024-01-29'), date('2024-01-29')),
      ])
    })

    it('should return every 2nd Monday for the month of January 2024', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.WEEKLY,
        byday: ['MO'],
        interval: 2,
        until: date('2024-01-31'),
      }

      const result = new RRule(options, date('2024-01-01')).getRecurrences()

      expect(result).toEqual([
        recurrence(date('2024-01-01'), date('2024-01-01')),
        recurrence(date('2024-01-15'), date('2024-01-15')),
        recurrence(date('2024-01-29'), date('2024-01-29')),
      ])
    })

    it('should return a timed event for every 2nd Monday and Wednesday for the month of January 2024', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.WEEKLY,
        byday: ['MO', 'WE'],
        interval: 2,
        until: datetime('2024-01-31 17:30'),
      }

      const result = new RRule(
        options,
        datetime('2024-01-01 17:30'),
        datetime('2024-01-01 19:00')
      ).getRecurrences()

      expect(result).toEqual([
        recurrence(datetime('2024-01-01 17:30'), datetime('2024-01-01 19:00')),
        recurrence(datetime('2024-01-03 17:30'), datetime('2024-01-03 19:00')),
        recurrence(datetime('2024-01-15 17:30'), datetime('2024-01-15 19:00')),
        recurrence(datetime('2024-01-17 17:30'), datetime('2024-01-17 19:00')),
        recurrence(datetime('2024-01-29 17:30'), datetime('2024-01-29 19:00')),
        recurrence(datetime('2024-01-31 17:30'), datetime('2024-01-31 19:00')),
      ])
    })

    it('should return a timed event for every 2nd Saturday and Sunday, 10 times, with wkst MO', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.WEEKLY,
        byday: ['SA', 'SU'],
        interval: 2,
        count: 10,
        wkst: 'MO',
      }

      const result = new RRule(
        options,
        datetime('2025-02-08 17:30'),
        datetime('2025-02-08 19:00')
      ).getRecurrences()

      expect(result).toEqual([
        recurrence(datetime('2025-02-08 17:30'), datetime('2025-02-08 19:00')),
        recurrence(datetime('2025-02-09 17:30'), datetime('2025-02-09 19:00')),
        recurrence(datetime('2025-02-22 17:30'), datetime('2025-02-22 19:00')),
        recurrence(datetime('2025-02-23 17:30'), datetime('2025-02-23 19:00')),
        recurrence(datetime('2025-03-08 17:30'), datetime('2025-03-08 19:00')),
        recurrence(datetime('2025-03-09 17:30'), datetime('2025-03-09 19:00')),
        recurrence(datetime('2025-03-22 17:30'), datetime('2025-03-22 19:00')),
        recurrence(datetime('2025-03-23 17:30'), datetime('2025-03-23 19:00')),
        recurrence(datetime('2025-04-05 17:30'), datetime('2025-04-05 19:00')),
        recurrence(datetime('2025-04-06 17:30'), datetime('2025-04-06 19:00')),
      ])
    })

    it('should return a timed event for every 2nd Saturday and Sunday, 4 times, with wkst SU', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.WEEKLY,
        byday: ['SU', 'SA'],
        interval: 2,
        count: 4,
        wkst: 'SU',
      }

      const result = new RRule(
        options,
        datetime('2025-02-02 17:30'),
        datetime('2025-02-02 19:00')
      ).getRecurrences()

      expect(result).toEqual([
        recurrence(datetime('2025-02-02 17:30'), datetime('2025-02-02 19:00')),
        recurrence(datetime('2025-02-08 17:30'), datetime('2025-02-08 19:00')),
        recurrence(datetime('2025-02-16 17:30'), datetime('2025-02-16 19:00')),
        recurrence(datetime('2025-02-22 17:30'), datetime('2025-02-22 19:00')),
      ])
    })
  })

  describe('weekly occurrences without byday option', () => {
    it('should return all Tuesdays of February 2024', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.WEEKLY,
        until: datetime('2024-02-29 20:15'),
      }

      const result = new RRule(
        options,
        datetime('2024-02-06 20:15'),
        datetime('2024-02-06 21:15')
      ).getRecurrences()

      expect(result).toEqual([
        recurrence(datetime('2024-02-06 20:15'), datetime('2024-02-06 21:15')),
        recurrence(datetime('2024-02-13 20:15'), datetime('2024-02-13 21:15')),
        recurrence(datetime('2024-02-20 20:15'), datetime('2024-02-20 21:15')),
        recurrence(datetime('2024-02-27 20:15'), datetime('2024-02-27 21:15')),
      ])
    })
  })

  describe('Getting weekly occurrences with count option', () => {
    it('should return first 10 Mondays of 2024', () => {
      const options: RRuleOptionsExternal = {
        freq: RRuleFreq.WEEKLY,
        count: 10,
      }

      const result = new RRule(options, date('2024-01-01')).getRecurrences()

      expect(result).toEqual([
        recurrence(date('2024-01-01'), date('2024-01-01')),
        recurrence(date('2024-01-08'), date('2024-01-08')),
        recurrence(date('2024-01-15'), date('2024-01-15')),
        recurrence(date('2024-01-22'), date('2024-01-22')),
        recurrence(date('2024-01-29'), date('2024-01-29')),
        recurrence(date('2024-02-05'), date('2024-02-05')),
        recurrence(date('2024-02-12'), date('2024-02-12')),
        recurrence(date('2024-02-19'), date('2024-02-19')),
        recurrence(date('2024-02-26'), date('2024-02-26')),
        recurrence(date('2024-03-04'), date('2024-03-04')),
      ])
    })
  })
})
