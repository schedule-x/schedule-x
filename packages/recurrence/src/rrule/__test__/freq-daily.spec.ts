import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RRule } from '../rrule'
import { RRuleFreq } from '../enums/rrule-freq'

describe('RRule', () => {
  describe('Getting daily recurrences', () => {
    // it('should return all days for the month of January 2024', () => {
    //   const options = {
    //     freq: RRuleFreq.DAILY,
    //     until: '2024-01-31',
    //   }
    //
    //   const result = new RRule(options, '2024-01-01').getRecurrences()
    //
    //   const expectedRecurrences = [
    //     { start: '2024-01-01', end: '2024-01-01' },
    //     { start: '2024-01-02', end: '2024-01-02' },
    //     { start: '2024-01-03', end: '2024-01-03' },
    //     { start: '2024-01-04', end: '2024-01-04' },
    //     { start: '2024-01-05', end: '2024-01-05' },
    //     { start: '2024-01-06', end: '2024-01-06' },
    //     { start: '2024-01-07', end: '2024-01-07' },
    //     { start: '2024-01-08', end: '2024-01-08' },
    //     { start: '2024-01-09', end: '2024-01-09' },
    //     { start: '2024-01-10', end: '2024-01-10' },
    //     { start: '2024-01-11', end: '2024-01-11' },
    //     { start: '2024-01-12', end: '2024-01-12' },
    //     { start: '2024-01-13', end: '2024-01-13' },
    //     { start: '2024-01-14', end: '2024-01-14' },
    //     { start: '2024-01-15', end: '2024-01-15' },
    //     { start: '2024-01-16', end: '2024-01-16' },
    //     { start: '2024-01-17', end: '2024-01-17' },
    //     { start: '2024-01-18', end: '2024-01-18' },
    //     { start: '2024-01-19', end: '2024-01-19' },
    //     { start: '2024-01-20', end: '2024-01-20' },
    //     { start: '2024-01-21', end: '2024-01-21' },
    //     { start: '2024-01-22', end: '2024-01-22' },
    //     { start: '2024-01-23', end: '2024-01-23' },
    //     { start: '2024-01-24', end: '2024-01-24' },
    //     { start: '2024-01-25', end: '2024-01-25' },
    //     { start: '2024-01-26', end: '2024-01-26' },
    //     { start: '2024-01-27', end: '2024-01-27' },
    //     { start: '2024-01-28', end: '2024-01-28' },
    //     { start: '2024-01-29', end: '2024-01-29' },
    //     { start: '2024-01-30', end: '2024-01-30' },
    //     { start: '2024-01-31', end: '2024-01-31' },
    //   ]
    //   expect(result).toEqual(expectedRecurrences)
    //   expect(result).toHaveLength(expectedRecurrences.length)
    // })

    it('should return all MO,TU,WE,TH,FR of January 2024', () => {
      const options = {
        freq: RRuleFreq.DAILY,
        until: '2024-01-31',
        byday: ['MO', 'TU', 'WE', 'TH', 'FR'],
      }

      const result = new RRule(options, '2024-01-01').getRecurrences()

      const expectedRecurrences = [
        { start: '2024-01-01', end: '2024-01-01' }, // MO
        { start: '2024-01-02', end: '2024-01-02' }, // TU
        { start: '2024-01-03', end: '2024-01-03' }, // WE
        { start: '2024-01-04', end: '2024-01-04' }, // TH
        { start: '2024-01-05', end: '2024-01-05' }, // FR
        { start: '2024-01-08', end: '2024-01-08' }, // MO
        { start: '2024-01-09', end: '2024-01-09' }, // TU
        { start: '2024-01-10', end: '2024-01-10' }, // WE
        { start: '2024-01-11', end: '2024-01-11' }, // TH
        { start: '2024-01-12', end: '2024-01-12' }, // FR
        { start: '2024-01-15', end: '2024-01-15' }, // MO
        { start: '2024-01-16', end: '2024-01-16' }, // TU
        { start: '2024-01-17', end: '2024-01-17' }, // WE
        { start: '2024-01-18', end: '2024-01-18' }, // TH
        { start: '2024-01-19', end: '2024-01-19' }, // FR
        { start: '2024-01-22', end: '2024-01-22' }, // MO
        { start: '2024-01-23', end: '2024-01-23' }, // TU
        { start: '2024-01-24', end: '2024-01-24' }, // WE
        { start: '2024-01-25', end: '2024-01-25' }, // TH
        { start: '2024-01-26', end: '2024-01-26' }, // FR
        { start: '2024-01-29', end: '2024-01-29' }, // MO
        { start: '2024-01-30', end: '2024-01-30' }, // TU
        { start: '2024-01-31', end: '2024-01-31' }, // WE
      ]
      expect(result).toEqual(expectedRecurrences)
      expect(result).toHaveLength(expectedRecurrences.length)
    })
    //
    // it('should return all recurrences for a timed event', () => {
    //   const options = {
    //     freq: RRuleFreq.DAILY,
    //     count: 10,
    //   }
    //
    //   const result = new RRule(
    //     options,
    //     '2024-02-06 17:45',
    //     '2024-02-06 18:30'
    //   ).getRecurrences()
    //
    //   const expectedRecurrences = [
    //     { start: '2024-02-06 17:45', end: '2024-02-06 18:30' },
    //     { start: '2024-02-07 17:45', end: '2024-02-07 18:30' },
    //     { start: '2024-02-08 17:45', end: '2024-02-08 18:30' },
    //     { start: '2024-02-09 17:45', end: '2024-02-09 18:30' },
    //     { start: '2024-02-10 17:45', end: '2024-02-10 18:30' },
    //     { start: '2024-02-11 17:45', end: '2024-02-11 18:30' },
    //     { start: '2024-02-12 17:45', end: '2024-02-12 18:30' },
    //     { start: '2024-02-13 17:45', end: '2024-02-13 18:30' },
    //     { start: '2024-02-14 17:45', end: '2024-02-14 18:30' },
    //     { start: '2024-02-15 17:45', end: '2024-02-15 18:30' },
    //   ]
    //   expect(result).toEqual(expectedRecurrences)
    // })
  })
})
