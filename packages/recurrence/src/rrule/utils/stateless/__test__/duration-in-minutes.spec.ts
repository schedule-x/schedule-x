import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getDurationInMinutes } from '../duration-in-minutes'

describe('getDurationInMinutes', () => {
  describe('when the start and end dates are the same', () => {
    it('should return 0', () => {
      const result = getDurationInMinutes(
        '2021-01-01 00:00',
        '2021-01-01 00:00'
      )

      expect(result).toEqual(0)
    })
  })

  describe('when the start and end dates are different', () => {
    it.each([
      ['2021-01-01 00:00', '2021-01-01 00:01', 1],
      ['2021-01-01 00:00', '2021-01-01 02:15', 135],
      ['2021-01-01', '2021-01-03', 2880],
      ['2021-01-01 01:00', '2021-01-03 02:00', 2940],
    ])(
      'should return the correct duration in minutes',
      (dtstart, dtend, expected) => {
        const result = getDurationInMinutes(dtstart, dtend)

        expect(result).toEqual(expected)
      }
    )
  })
})
