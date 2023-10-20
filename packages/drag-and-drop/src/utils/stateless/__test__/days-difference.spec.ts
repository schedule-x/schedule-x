import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { calculateDaysDifference } from '../days-difference'

describe('calculating difference between 2 days', () => {
  describe('when the difference is 0', () => {
    it('should return 0', () => {
      expect(calculateDaysDifference('2020-01-01', '2020-01-01')).toBe(0)
    })

    it('should return 0 also on a day of daylight saving time change', () => {
      expect(calculateDaysDifference('2020-03-29', '2020-03-29')).toBe(0)
    })
  })

  describe('when the difference is 1', () => {
    it('should return 1', () => {
      expect(calculateDaysDifference('2020-01-01', '2020-01-02')).toBe(1)
    })

    it('should return 1 also on a day of daylight saving time change', () => {
      expect(calculateDaysDifference('2020-03-28', '2020-03-30')).toBe(2)
    })

    it('should return 1 also on a day of daylight saving time change', () => {
      expect(calculateDaysDifference('2020-10-25', '2020-10-27')).toBe(2)
    })
  })
})
