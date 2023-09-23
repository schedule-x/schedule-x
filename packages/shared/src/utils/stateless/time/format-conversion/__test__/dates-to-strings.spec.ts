import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import {
  toDateString,
  toDateTimeString,
  toTimeString,
} from '../date-to-strings'

it.each([
  [new Date(2000, 0, 1, 0, 0), '00:00'],
  [new Date(2000, 11, 31, 23, 59), '23:59'],
])('should return a time string', (date, expectedResult) => {
  expect(toTimeString(date)).toBe(expectedResult)
})

it.each([
  [new Date(2000, 0, 1, 0, 0), '2000-01-01'],
  [new Date(2000, 11, 31, 23, 59), '2000-12-31'],
])('should return a date string', (date, expectedResult) => {
  expect(toDateString(date)).toBe(expectedResult)
})

it.each([
  [new Date(2000, 0, 1, 0, 0), '2000-01-01 00:00'],
  [new Date(2000, 11, 31, 23, 59), '2000-12-31 23:59'],
])('should return a date time string', (date, expectedResult) => {
  expect(toDateTimeString(date)).toBe(expectedResult)
})
