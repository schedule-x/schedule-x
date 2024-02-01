import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { rruleJSToString } from '../parse-rrule'
import { RRuleFreq } from '../../../rrule/enums/rrule-freq'

describe('Parsing an rrule from js to string', () => {
  describe('With freq and until', () => {
    it('should return the correct rrule', () => {
      const result = rruleJSToString({
        freq: RRuleFreq.WEEKLY,
        until: '2021-01-15',
      })

      expect(result).toEqual('FREQ=WEEKLY;UNTIL=2021-01-15')
    })
  })

  describe('With freq, until and byday', () => {
    it('should return the correct rrule', () => {
      const result = rruleJSToString({
        freq: RRuleFreq.WEEKLY,
        until: '2021-01-15',
        byday: ['MO', 'WE'],
      })

      expect(result).toEqual('FREQ=WEEKLY;UNTIL=2021-01-15;BYDAY=MO,WE')
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
})
