import {
  describe,
  expect,
  it,
} from '../../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { timePointsPerDay } from '../time-points-per-day'
import { timePointsFromString } from '../string-conversion'

describe('Getting number of time points per day', () => {
  describe('a hybrid day', () => {
    it('should return time points for a day between 21:00 and 21:00', () => {
      const result = timePointsPerDay(2100, 2100, true)

      expect(result).toEqual(2400)
    })

    it('should return time points for a day between 03:00 and 02:00', () => {
      const result = timePointsPerDay(300, 200, true)

      expect(result).toEqual(2300)
    })

    it('should return time points for a day between 03:05 and 02:30', () => {
      const result = timePointsPerDay(
        timePointsFromString('03:05'),
        timePointsFromString('02:30'),
        true
      )

      expect(result).toEqual(2341.6666666666665)
    })
  })

  describe('a regular day', () => {
    it('should return time points for a day between 00:00 and 00:00', () => {
      const result = timePointsPerDay(0, 0, false)

      expect(result).toEqual(2400)
    })

    it('should return time points for a day between 00:00 and 23:00', () => {
      const result = timePointsPerDay(0, 2300, false)

      expect(result).toEqual(2300)
    })

    it('should return time points for a day between 00:00 and 23:59', () => {
      const result = timePointsPerDay(0, timePointsFromString('23:50'), false)

      expect(result).toEqual(2383.3333333333335)
    })
  })
})
