import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import { toIntegers, toJSDate } from '../format-conversion'
import { InvalidDateTimeError } from '../../../errors/invalid-date-time.error'

describe('date time format-conversion', () => {
  it.each([
    ['2000-01-01', { year: 2000, month: 0, day: 1, hour: 0, minute: 0 }],
    ['2000-12-31', { year: 2000, month: 11, day: 31, hour: 0, minute: 0 }],
    ['2023-03-26', { year: 2023, month: 2, day: 26, hour: 0, minute: 0 }],
    ['2023-10-29', { year: 2023, month: 9, day: 29, hour: 0, minute: 0 }],
  ])(
    'should convert the date string %s to a JS Date object',
    (dateString, expectedParams) => {
      const actual = toJSDate(dateString)
      expect(actual.getFullYear()).toBe(expectedParams.year)
      expect(actual.getMonth()).toBe(expectedParams.month)
      expect(actual.getDate()).toBe(expectedParams.day)
      expect(actual.getHours()).toBe(expectedParams.hour)
      expect(actual.getMinutes()).toBe(expectedParams.minute)
    }
  )

  it.each([
    ['2024-01-01 00:00', { year: 2024, month: 0, day: 1, hour: 0, minute: 0 }],
    [
      '2024-12-31 23:59',
      { year: 2024, month: 11, day: 31, hour: 23, minute: 59 },
    ],
    ['2023-03-26 04:00', { year: 2023, month: 2, day: 26, hour: 4, minute: 0 }],
    ['2023-10-29 03:00', { year: 2023, month: 9, day: 29, hour: 3, minute: 0 }],
  ])(
    `should convert the date time string %s to a JS Date object`,
    (dateTimeSpecification, expectedParams) => {
      const actual = toJSDate(dateTimeSpecification)
      expect(actual.getFullYear()).toBe(expectedParams.year)
      expect(actual.getMonth()).toBe(expectedParams.month)
      expect(actual.getDate()).toBe(expectedParams.day)
      expect(actual.getHours()).toBe(expectedParams.hour)
      expect(actual.getMinutes()).toBe(expectedParams.minute)
    }
  )

  it.each([
    ['2000-01-01 '],
    ['2023-11-00 10:00:00'],
    ['10:00'],
    ['2023'],
    ['20231100'],
  ])(
    'should throw an error for faulty date time strings',
    (dateTimeSpecification) => {
      expect(() => toJSDate(dateTimeSpecification)).toThrow(
        InvalidDateTimeError
      )
    }
  )

  it.each([
    [
      '2000-01-01',
      { year: 2000, month: 0, day: 1, hour: undefined, minute: undefined },
    ],
    [
      '2000-12-31',
      { year: 2000, month: 11, day: 31, hour: undefined, minute: undefined },
    ],
    [
      '2023-03-26 00:56',
      { year: 2023, month: 2, day: 26, hour: 0, minute: 56 },
    ],
    [
      '2023-10-29 23:59',
      { year: 2023, month: 9, day: 29, hour: 23, minute: 59 },
    ],
  ])(
    'should get all variables from a time specification string',
    (dateString, expectedResults) => {
      const actual = toIntegers(dateString)
      expect(actual.year).toBe(expectedResults.year)
      expect(actual.month).toBe(expectedResults.month)
      expect(actual.date).toBe(expectedResults.day)
      expect(actual.hours).toBe(expectedResults.hour)
      expect(actual.minutes).toBe(expectedResults.minute)
    }
  )
})
