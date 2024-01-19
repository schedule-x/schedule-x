import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { calculateMinutesDifference } from '../calculate-minutes-difference'

describe('Calculating the difference in minutes between two date time strings', () => {
  describe('When the difference is 0', () => {
    it('should return 0', () => {
      expect(
        calculateMinutesDifference('2024-01-17 01:12', '2024-01-17 01:12')
      ).toBe(0)
    })
  })

  describe('When both timestamps are in one day', () => {
    it('should return 60', () => {
      expect(
        calculateMinutesDifference('2024-01-17 01:12', '2024-01-17 02:12')
      ).toBe(60)
    })
  })

  describe('When timestamps are in different days', () => {
    it('should return 1440', () => {
      expect(
        calculateMinutesDifference('2024-01-17 01:12', '2024-01-18 01:12')
      ).toBe(1440)
    })
  })
})
