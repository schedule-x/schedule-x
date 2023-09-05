import {
  describe,
  expect,
  it,
} from '../../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { timePointsFromString } from '../time-points-from-string'
import { InvalidTimeStringError } from '../../../../../../../../shared/utils/stateless/errors/invalid-time-string.error'

describe('TimePointsFromString', () => {
  describe('turning a string into a time point', () => {
    it.each([
      ['00:00', 0],
      ['00:30', 50],
      ['01:00', 100],
      ['01:15', 125],
      ['01:30', 150],
      ['01:45', 175],
      ['02:00', 200],
      ['10:00', 1000],
      ['10:30', 1050],
      ['11:00', 1100],
      ['12:00', 1200],
      ['23:30', 2350],
      ['23:59', 2398.3333333333335],
    ])(
      'should turn time string %s into time point %s',
      (timeString, expectedTimePoint) => {
        expect(timePointsFromString(timeString)).toBe(expectedTimePoint)
      }
    )

    it.each([
      ['24:00'],
      ['25:00'],
      ['00:60'],
      ['00:61'],
      ['00:99'],
      ['00:100'],
      ['1:00'],
      ['10:30.000'],
    ])(
      `should throw an error because the time string %s is invalid`,
      (timeString) => {
        expect(() => timePointsFromString(timeString)).toThrow(
          InvalidTimeStringError
        )
      }
    )
  })
})
