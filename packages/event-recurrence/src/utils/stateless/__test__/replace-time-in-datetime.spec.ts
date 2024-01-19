import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { replaceTimeInDatetime } from '../replace-time-in-datetime'

describe('Replacing the time in a date time string', () => {
  it.each([
    ['2024-01-17 01:12', '12:00', '2024-01-17 12:00'],
    ['3000-01-01 00:00', '12:00', '3000-01-01 12:00'],
    ['2023-11-22 23:59', '00:00', '2023-11-22 00:00'],
  ])(
    'should return the date time string with the time replaced',
    (dateTime, time, expected) => {
      expect(replaceTimeInDatetime(dateTime, time)).toBe(expected)
    }
  )
})
