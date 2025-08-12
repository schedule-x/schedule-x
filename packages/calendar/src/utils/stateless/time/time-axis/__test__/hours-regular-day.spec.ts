import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getTimeAxisHours } from '../time-axis'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

describe('TimeAxis', () => {
  describe('getting hours for non-hybrid days', () => {
    it('should return an array of hours between 00:00 and 00:00', () => {
      const dayBoundaries = {
        start: 0,
        end: 0,
      }
      const isHybridDay = false
      const result = getTimeAxisHours(dayBoundaries, isHybridDay)
      expect(result).toEqual([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ])
    })

    it('should return an array of hours between 00:00 and 23:00', () => {
      const dayBoundaries = {
        start: 0,
        end: 2300,
      }
      const isHybridDay = false
      const result = getTimeAxisHours(dayBoundaries, isHybridDay)
      expect(result).toEqual([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22,
      ])
    })

    it('should return an array of hours between 00:00 and 23:59', () => {
      const dayBoundaries = {
        start: 0,
        end: timePointsFromString('23:59'),
      }
      const isHybridDay = false
      const result = getTimeAxisHours(dayBoundaries, isHybridDay)
      expect(result).toEqual([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ])
    })

    it('should return an array of hours between 00:50 and 11:59', () => {
      const dayBoundaries = {
        start: timePointsFromString('00:50'),
        end: timePointsFromString('11:59'),
      }
      const isHybridDay = false
      const result = getTimeAxisHours(dayBoundaries, isHybridDay)
      expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    })

    it('should return an array of hours between 06:00 and 14:59', () => {
      const dayBoundaries = {
        start: timePointsFromString('06:00'),
        end: timePointsFromString('14:59'),
      }
      const isHybridDay = false
      const result = getTimeAxisHours(dayBoundaries, isHybridDay)
      expect(result).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14])
    })
  })
})
