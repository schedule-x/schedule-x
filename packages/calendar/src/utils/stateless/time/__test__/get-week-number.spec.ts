import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getWeekNumber } from '../get-week-number'

describe('getWeekNumber', () => {
  it.each([
    [new Date(2024, 11, 29), 52],
    [new Date(2024, 11, 30), 1],
    [new Date(2024, 11, 31), 1],
    [new Date(2025, 0, 1), 1],
    [new Date(2025, 6, 21), 30],
    [new Date(2025, 8, 1), 36],
    [new Date(2025, 11, 28), 52],
    [new Date(2025, 11, 29), 1],
  ])(
    `should return the correct week number for German weeks`,
    (date, expected) => {
      expect(getWeekNumber(date, 1)).toBe(expected)
    }
  )

  it.each([
    [new Date(2024, 11, 28), 52],
    [new Date(2024, 11, 29), 1],
    [new Date(2024, 11, 31), 1],
    [new Date(2025, 0, 1), 1],
    [new Date(2025, 6, 21), 30],
    [new Date(2025, 8, 1), 36],
    [new Date(2025, 11, 27), 52],
    [new Date(2025, 11, 28), 1],
    [new Date(2025, 11, 29), 1],
  ])('should return the correct week number for US weeks', (date, expected) => {
    expect(getWeekNumber(date, 0)).toBe(expected)
  })
})
