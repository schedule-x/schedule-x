import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import {
  doubleDigit,
  getFirstDayOfNextMonth,
  getFirstDayOPreviousMonth,
  setDateOfMonth,
} from '../date-time-mutation'
import { NumberRangeError } from '../../../errors/number-range.error'

describe('date time mutation', () => {
  describe('doubleDigit', () => {
    it('should throw and error if number is negative', () => {
      expect(() => doubleDigit(-1)).toThrow(NumberRangeError)
    })

    it('should throw and error if number is greater than 99', () => {
      expect(() => doubleDigit(100)).toThrow(NumberRangeError)
    })

    it.each([
      [10, '10'],
      [20, '20'],
      [30, '30'],
      [40, '40'],
      [50, '50'],
      [60, '60'],
      [70, '70'],
      [80, '80'],
      [90, '90'],
      [99, '99'],
    ])(
      'should return a stringified number for double digit numbers',
      (inputValue, outputValue) => {
        expect(doubleDigit(inputValue)).toBe(outputValue)
      }
    )

    it.each([
      [0, '00'],
      [1, '01'],
      [2, '02'],
      [3, '03'],
      [4, '04'],
      [5, '05'],
      [6, '06'],
      [7, '07'],
      [8, '08'],
      [9, '09'],
    ])(
      'should get a double digit string for numbers between 0 and 10',
      (inputValue, outputValue) => {
        expect(doubleDigit(inputValue)).toBe(outputValue)
      }
    )
  })

  describe('getting first day of previous month', () => {
    const underTest = getFirstDayOPreviousMonth

    it.each([
      ['2020-01-01', '2019-12-01'],
      ['2023-07-23', '2023-06-01'],
    ])('should get first day of previous month', (date, expectedResult) => {
      expect(underTest(date)).toBe(expectedResult)
    })
  })

  describe('getting first day of next month', () => {
    const underTest = getFirstDayOfNextMonth

    it.each([
      ['2020-01-01', '2020-02-01'],
      ['2023-07-23', '2023-08-01'],
    ])('should get first day of next month', (date, expectedResult) => {
      expect(underTest(date)).toBe(expectedResult)
    })
  })

  describe('setting date of month', () => {
    it.each([
      ['2020-01-01', 1, '2020-01-01'],
      ['2020-01-01', 2, '2020-01-02'],
      ['2023-12-31', 1, '2023-12-01'],
      ['2023-12-01', 31, '2023-12-31'],
      ['2023-12-01 22:56', 31, '2023-12-31 22:56'],
      ['2000-02-01 00:00', 29, '2000-02-29 00:00'],
    ])(`should set date of month`, (dateString, date, expectedResult) => {
      expect(setDateOfMonth(dateString, date)).toBe(expectedResult)
    })
  })
})
