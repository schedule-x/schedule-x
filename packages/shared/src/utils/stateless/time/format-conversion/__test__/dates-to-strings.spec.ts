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
import 'temporal-polyfill/global'

describe('converting dates to different date-time string formats', () => {
  it.each([
    [Temporal.ZonedDateTime.from('2000-01-01T00:00:00+01:00[Europe/Berlin]'), '00:00'],
    [Temporal.ZonedDateTime.from('2000-12-31T23:59:00+01:00[Europe/Berlin]'), '23:59'],
  ])('should return a time string', (date, expectedResult) => {
    expect(toTimeString(date)).toBe(expectedResult)
  })

  it.each([
    [Temporal.ZonedDateTime.from('2000-01-01T00:00:00+01:00[Europe/Berlin]'), '2000-01-01'],
    [Temporal.ZonedDateTime.from('2000-12-31T23:59:00+01:00[Europe/Berlin]'), '2000-12-31'],
  ])('should return a date string', (date, expectedResult) => {
    expect(toDateString(date)).toBe(expectedResult)
  })

  it.each([
    [Temporal.ZonedDateTime.from('2000-01-01T00:00:00+01:00[Europe/Berlin]'), '2000-01-01 00:00'],
    [Temporal.ZonedDateTime.from('2000-12-31T23:59:00+01:00[Europe/Berlin]'), '2000-12-31 23:59'],
  ])('should return a date time string', (date, expectedResult) => {
    expect(toDateTimeString(date)).toBe(expectedResult)
  })
})
