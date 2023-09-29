import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { timePointToPercentage } from '../time-point-to-grid-percentage'

describe('getting percentage into grid for a time point', () => {
  describe('a regular day', () => {
    it('should return 0 for 00:00', () => {
      const timePoint = timePointsFromString('00:00')
      const dayBoundaries = {
        start: timePointsFromString('00:00'),
        end: timePointsFromString('00:00'),
      }

      const result = timePointToPercentage(2400, dayBoundaries, timePoint)

      expect(result).toEqual(0)
    })

    it('should return > 99 for 23:59', () => {
      const timePoint = timePointsFromString('23:59')
      const dayBoundaries = {
        start: timePointsFromString('00:00'),
        end: timePointsFromString('00:00'),
      }

      const result = timePointToPercentage(2400, dayBoundaries, timePoint)

      expect(result).toBeGreaterThan(99)
      expect(result).toBeLessThan(100)
    })
  })

  describe('a hybrid day', () => {
    it('should return 50 for 00:00', () => {
      const timePoint = timePointsFromString('00:00')
      const dayBoundaries = {
        start: timePointsFromString('22:00'),
        end: timePointsFromString('02:00'),
      }

      const result = timePointToPercentage(400, dayBoundaries, timePoint)

      expect(result).toEqual(50)
    })

    it('should return 90 for 01:00', () => {
      const timePoint = timePointsFromString('01:00')
      const dayBoundaries = {
        start: timePointsFromString('16:00'),
        end: timePointsFromString('02:00'),
      }

      const result = timePointToPercentage(1000, dayBoundaries, timePoint)

      expect(result).toEqual(90)
    })

    it('should return 70 for 23:00', () => {
      const timePoint = timePointsFromString('23:00')
      const dayBoundaries = {
        start: timePointsFromString('16:00'),
        end: timePointsFromString('02:00'),
      }

      const result = timePointToPercentage(1000, dayBoundaries, timePoint)

      expect(result).toEqual(70)
    })
  })
})
