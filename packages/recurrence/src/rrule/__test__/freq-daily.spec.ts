import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RRule } from '../rrule'
import { RRuleFreq } from '../enums/rrule-freq'
import { date, datetime, recurrence } from '../../__test__/test-utils'

describe('RRule', () => {
  describe('Getting daily recurrences', () => {
    it('should return all days for the month of January 2024', () => {
      const options = {
        freq: RRuleFreq.DAILY,
        until: date('2024-01-31'),
      }

      const result = new RRule(options, date('2024-01-01')).getRecurrences()

      const expectedRecurrences = [
        recurrence(date('2024-01-01'), date('2024-01-01')),
        recurrence(date('2024-01-02'), date('2024-01-02')),
        recurrence(date('2024-01-03'), date('2024-01-03')),
        recurrence(date('2024-01-04'), date('2024-01-04')),
        recurrence(date('2024-01-05'), date('2024-01-05')),
        recurrence(date('2024-01-06'), date('2024-01-06')),
        recurrence(date('2024-01-07'), date('2024-01-07')),
        recurrence(date('2024-01-08'), date('2024-01-08')),
        recurrence(date('2024-01-09'), date('2024-01-09')),
        recurrence(date('2024-01-10'), date('2024-01-10')),
        recurrence(date('2024-01-11'), date('2024-01-11')),
        recurrence(date('2024-01-12'), date('2024-01-12')),
        recurrence(date('2024-01-13'), date('2024-01-13')),
        recurrence(date('2024-01-14'), date('2024-01-14')),
        recurrence(date('2024-01-15'), date('2024-01-15')),
        recurrence(date('2024-01-16'), date('2024-01-16')),
        recurrence(date('2024-01-17'), date('2024-01-17')),
        recurrence(date('2024-01-18'), date('2024-01-18')),
        recurrence(date('2024-01-19'), date('2024-01-19')),
        recurrence(date('2024-01-20'), date('2024-01-20')),
        recurrence(date('2024-01-21'), date('2024-01-21')),
        recurrence(date('2024-01-22'), date('2024-01-22')),
        recurrence(date('2024-01-23'), date('2024-01-23')),
        recurrence(date('2024-01-24'), date('2024-01-24')),
        recurrence(date('2024-01-25'), date('2024-01-25')),
        recurrence(date('2024-01-26'), date('2024-01-26')),
        recurrence(date('2024-01-27'), date('2024-01-27')),
        recurrence(date('2024-01-28'), date('2024-01-28')),
        recurrence(date('2024-01-29'), date('2024-01-29')),
        recurrence(date('2024-01-30'), date('2024-01-30')),
        recurrence(date('2024-01-31'), date('2024-01-31')),
      ]
      expect(result).toEqual(expectedRecurrences)
      expect(result).toHaveLength(expectedRecurrences.length)
    })

    it('should return all MO,TU,WE,TH,FR of January 2024', () => {
      const options = {
        freq: RRuleFreq.DAILY,
        until: date('2024-01-31'),
        byday: ['MO', 'TU', 'WE', 'TH', 'FR'],
      }

      const result = new RRule(options, date('2024-01-01')).getRecurrences()

      const expectedRecurrences = [
        recurrence(date('2024-01-01'), date('2024-01-01')), // MO
        recurrence(date('2024-01-02'), date('2024-01-02')), // TU
        recurrence(date('2024-01-03'), date('2024-01-03')), // WE
        recurrence(date('2024-01-04'), date('2024-01-04')), // TH
        recurrence(date('2024-01-05'), date('2024-01-05')), // FR
        recurrence(date('2024-01-08'), date('2024-01-08')), // MO
        recurrence(date('2024-01-09'), date('2024-01-09')), // TU
        recurrence(date('2024-01-10'), date('2024-01-10')), // WE
        recurrence(date('2024-01-11'), date('2024-01-11')), // TH
        recurrence(date('2024-01-12'), date('2024-01-12')), // FR
        recurrence(date('2024-01-15'), date('2024-01-15')), // MO
        recurrence(date('2024-01-16'), date('2024-01-16')), // TU
        recurrence(date('2024-01-17'), date('2024-01-17')), // WE
        recurrence(date('2024-01-18'), date('2024-01-18')), // TH
        recurrence(date('2024-01-19'), date('2024-01-19')), // FR
        recurrence(date('2024-01-22'), date('2024-01-22')), // MO
        recurrence(date('2024-01-23'), date('2024-01-23')), // TU
        recurrence(date('2024-01-24'), date('2024-01-24')), // WE
        recurrence(date('2024-01-25'), date('2024-01-25')), // TH
        recurrence(date('2024-01-26'), date('2024-01-26')), // FR
        recurrence(date('2024-01-29'), date('2024-01-29')), // MO
        recurrence(date('2024-01-30'), date('2024-01-30')), // TU
        recurrence(date('2024-01-31'), date('2024-01-31')), // WE
      ]
      expect(result).toEqual(expectedRecurrences)
      expect(result).toHaveLength(expectedRecurrences.length)
    })

    it('should return all recurrences for a timed event', () => {
      const options = {
        freq: RRuleFreq.DAILY,
        count: 10,
      }

      const result = new RRule(
        options,
        datetime('2024-02-06 17:45'),
        datetime('2024-02-06 18:30')
      ).getRecurrences()

      const expectedRecurrences = [
        recurrence(datetime('2024-02-06 17:45'), datetime('2024-02-06 18:30')),
        recurrence(datetime('2024-02-07 17:45'), datetime('2024-02-07 18:30')),
        recurrence(datetime('2024-02-08 17:45'), datetime('2024-02-08 18:30')),
        recurrence(datetime('2024-02-09 17:45'), datetime('2024-02-09 18:30')),
        recurrence(datetime('2024-02-10 17:45'), datetime('2024-02-10 18:30')),
        recurrence(datetime('2024-02-11 17:45'), datetime('2024-02-11 18:30')),
        recurrence(datetime('2024-02-12 17:45'), datetime('2024-02-12 18:30')),
        recurrence(datetime('2024-02-13 17:45'), datetime('2024-02-13 18:30')),
        recurrence(datetime('2024-02-14 17:45'), datetime('2024-02-14 18:30')),
        recurrence(datetime('2024-02-15 17:45'), datetime('2024-02-15 18:30')),
      ]
      expect(result).toEqual(expectedRecurrences)
    })
  })
})
