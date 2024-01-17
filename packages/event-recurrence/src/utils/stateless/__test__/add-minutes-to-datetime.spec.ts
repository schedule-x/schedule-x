import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { addMinutesToDatetime } from '../add-minutes-to-datetime'

describe('Adding minutes to a date time string', () => {
  describe('Adding nothing', () => {
    it.each([
      ['2024-01-17 01:12', 0],
      ['3000-01-01 00:00', 0],
    ])('should return the same date time string', (dateTime, minutes) => {
      expect(addMinutesToDatetime(dateTime, minutes)).toBe(dateTime)
    })
  })

  describe('Adding minutes to a date time string, not changing the day', () => {
    it.each([
      ['2024-01-17 01:12', 60, '2024-01-17 02:12'],
      ['2024-05-01 17:30', 45, '2024-05-01 18:15'],
    ])(
      `should return the date time string with %i minutes added`,
      (dateTime, minutes, expected) => {
        expect(addMinutesToDatetime(dateTime, minutes)).toBe(expected)
      }
    )
  })

  describe('Adding minutes to a date time string, changing the day', () => {
    it.each([
      ['2024-01-17 01:12', 1440, '2024-01-18 01:12'],
      ['2024-05-01 17:30', 1441, '2024-05-02 17:31'],
    ])(
      `should return the date time string with %i minutes added`,
      (dateTime, minutes, expected) => {
        expect(addMinutesToDatetime(dateTime, minutes)).toBe(expected)
      }
    )
  })

  describe('Adding minutes to a date time string, changing the day and month', () => {
    it.each([
      ['2024-01-17 01:12', 44640, '2024-02-17 01:12'],
      ['2024-05-01 17:30', 44641, '2024-06-01 17:31'],
    ])(
      `should return the date time string with %i minutes added`,
      (dateTime, minutes, expected) => {
        expect(addMinutesToDatetime(dateTime, minutes)).toBe(expected)
      }
    )
  })
})
