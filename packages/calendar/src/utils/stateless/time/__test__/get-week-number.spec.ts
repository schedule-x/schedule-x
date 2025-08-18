import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getWeekNumber } from '../get-week-number'

describe('getWeekNumber', () => {
  it.each([
    [Temporal.ZonedDateTime.from('2024-12-29T00:00:00[UTC]'), 52],
    [Temporal.ZonedDateTime.from('2024-12-30T00:00:00[UTC]'), 1],
    [Temporal.ZonedDateTime.from('2024-12-31T00:00:00[UTC]'), 1],
    [Temporal.ZonedDateTime.from('2025-01-01T00:00:00[UTC]'), 1],
    [Temporal.ZonedDateTime.from('2025-07-21T00:00:00[UTC]'), 30],
    [Temporal.ZonedDateTime.from('2025-09-01T00:00:00[UTC]'), 36],
    [Temporal.ZonedDateTime.from('2025-12-28T00:00:00[UTC]'), 52],
    [Temporal.ZonedDateTime.from('2025-12-29T00:00:00[UTC]'), 1],
  ])(
    `should return the correct week number for German weeks`,
    (date, expected) => {
      expect(getWeekNumber(date, 1)).toBe(expected)
    }
  )

  it.each([
    [Temporal.ZonedDateTime.from('2024-12-28T00:00:00[UTC]'), 52],
    [Temporal.ZonedDateTime.from('2024-12-29T00:00:00[UTC]'), 1],
    [Temporal.ZonedDateTime.from('2024-12-31T00:00:00[UTC]'), 1],
    [Temporal.ZonedDateTime.from('2025-01-01T00:00:00[UTC]'), 1],
    [Temporal.ZonedDateTime.from('2025-07-21T00:00:00[UTC]'), 30],
    [Temporal.ZonedDateTime.from('2025-09-01T00:00:00[UTC]'), 36],
    [Temporal.ZonedDateTime.from('2025-12-27T00:00:00[UTC]'), 52],
    [Temporal.ZonedDateTime.from('2025-12-28T00:00:00[UTC]'), 1],
    [Temporal.ZonedDateTime.from('2025-12-29T00:00:00[UTC]'), 1],
  ])('should return the correct week number for US weeks', (date, expected) => {
    expect(getWeekNumber(date, 0)).toBe(expected)
  })
})
