import {
  describe,
  expect,
  it,
} from '../../../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import {
  timePointsFromString,
  timeStringFromTimePoints,
} from '../string-conversion'
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
      ['11:02', 1103.3333333333333],
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

  describe('turning a time point into a string', () => {
    it.each([
      [0, '00:00'],
      [50, '00:30'],
      [100, '01:00'],
      [125, '01:15'],
      [150, '01:30'],
      [175, '01:45'],
      [200, '02:00'],
      [1000, '10:00'],
      [1050, '10:30'],
      [1100, '11:00'],
      [1103.3333333333333, '11:02'],
      [1200, '12:00'],
      [2350, '23:30'],
      [2398.3333333333335, '23:59'],
    ])(
      'should turn time point %s into time string %s',
      (timePoint, expectedTimeString) => {
        expect(timeStringFromTimePoints(timePoint)).toBe(expectedTimeString)
      }
    )
  })
})
