import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { rruleJSToString } from '../parse-rrule'
import { RRuleFreq } from '../../../rrule/enums/rrule-freq'
import { date } from '../../../__test__/test-utils'

describe('Parsing an rrule from js to string', () => {
  describe('With freq and until', () => {
    it('should return the correct rrule', () => {
      const result = rruleJSToString({
        freq: RRuleFreq.WEEKLY,
        until: date('2021-01-15'),
      })

      expect(result).toEqual('FREQ=WEEKLY;UNTIL=20210115')
    })
  })

  describe('With freq, until and byday', () => {
    it('should return the correct rrule', () => {
      const result = rruleJSToString({
        freq: RRuleFreq.WEEKLY,
        until: date('2021-01-15'),
        byday: ['MO', 'WE'],
      })

      expect(result).toEqual('FREQ=WEEKLY;UNTIL=20210115;BYDAY=MO,WE')
    })
  })

  describe('With freq, byday and count', () => {
    it('should return the correct rrule', () => {
      const result = rruleJSToString({
        freq: RRuleFreq.WEEKLY,
        count: 5,
        byday: ['MO', 'WE'],
      })

      expect(result).toEqual('FREQ=WEEKLY;COUNT=5;BYDAY=MO,WE')
    })
  })

  describe('With freq, byday, interval and wkst', () => {
    it('should return the correct rrule', () => {
      const result = rruleJSToString({
        freq: RRuleFreq.WEEKLY,
        byday: ['MO', 'WE'],
        wkst: 'SU',
        interval: 2,
      })

      expect(result).toEqual('FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;WKST=SU')
    })
  })
})
