import {
  describe,
  expect,
  it,
} from '../../../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getTimeAxisHours } from '../time-axis'
import { timePointsFromString } from '../../time-points/string-conversion'

describe('TimeAxis', () => {
  describe('getting hours for hybrid days', () => {
    it.each([
      [
        { start: '01:00', end: '01:00' },
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 0,
        ],
      ],
      [
        { start: '23:00', end: '23:00' },
        [
          23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22,
        ],
      ],
      [{ start: '23:00', end: '01:00' }, [23, 0]],
      [{ start: '23:00', end: '01:01' }, [23, 0, 1]],
    ])('should take %p and return %p', (dayBoundaries, expected) => {
      const isHybridDay = true
      const result = getTimeAxisHours(
        {
          start: timePointsFromString(dayBoundaries.start),
          end: timePointsFromString(dayBoundaries.end),
        },
        isHybridDay
      )
      expect(result).toEqual(expected)
    })
  })
})
