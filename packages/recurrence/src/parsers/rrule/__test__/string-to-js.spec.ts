import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { rruleStringToJS } from '../parse-rrule'

describe('Parsing an rrule from string to JS', () => {
  describe('With freq and until', () => {
    it('should return the correct rrule', () => {
      const result = rruleStringToJS('FREQ=WEEKLY;UNTIL=2021-01-15')

      expect(result).toEqual({
        freq: 'WEEKLY',
        until: '2021-01-15',
      })
    })
  })

  describe('With freq, until, interval and byday', () => {
    it('should return the correct rrule', () => {
      const result = rruleStringToJS(
        'FREQ=WEEKLY;UNTIL=2021-01-15;BYDAY=MO,WE;INTERVAL=2'
      )

      expect(result).toEqual({
        freq: 'WEEKLY',
        until: '2021-01-15',
        byday: ['MO', 'WE'],
        interval: 2,
      })
    })
  })

  describe('With freq, byday and count', () => {
    it('should return the correct rrule', () => {
      const result = rruleStringToJS('FREQ=WEEKLY;COUNT=5;BYDAY=MO,WE')

      expect(result).toEqual({
        freq: 'WEEKLY',
        count: 5,
        byday: ['MO', 'WE'],
      })
    })
  })

  describe('with freq, byday, interval and wkst', () => {
    it('should return the correct rrule', () => {
      const result = rruleStringToJS(
        'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;WKST=SU;'
      )

      expect(result).toEqual({
        freq: 'WEEKLY',
        byday: ['MO', 'WE'],
        wkst: 'SU',
        interval: 2,
      })
    })
  })
})
