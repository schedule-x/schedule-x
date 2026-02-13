import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getWeekForDate } from '../get-week-for-date'
import { date } from '../../../../__test__/test-utils'

describe('getWeekForDate', () => {
  it('should return the week number for 2024-01-01', () => {
    const result = getWeekForDate(date('2024-01-01'))

    expect(result).toEqual([
      date('2023-12-31'),
      date('2024-01-01'),
      date('2024-01-02'),
      date('2024-01-03'),
      date('2024-01-04'),
      date('2024-01-05'),
      date('2024-01-06'),
    ])
  })

  it('should return the week number for 2024-01-31', () => {
    const result = getWeekForDate(date('2024-01-31'))

    expect(result).toEqual([
      date('2024-01-28'),
      date('2024-01-29'),
      date('2024-01-30'),
      date('2024-01-31'),
      date('2024-02-01'),
      date('2024-02-02'),
      date('2024-02-03'),
    ])
  })

  it('should return the week dates for 2024-03-30', () => {
    const result = getWeekForDate(date('2024-03-30'))
    expect(result).toEqual([
      date('2024-03-24'),
      date('2024-03-25'),
      date('2024-03-26'),
      date('2024-03-27'),
      date('2024-03-28'),
      date('2024-03-29'),
      date('2024-03-30'),
    ])
  })

  it('should return the week dates for 2024-02-04', () => {
    const result = getWeekForDate(date('2024-02-04'))
    expect(result).toEqual([
      date('2024-02-04'),
      date('2024-02-05'),
      date('2024-02-06'),
      date('2024-02-07'),
      date('2024-02-08'),
      date('2024-02-09'),
      date('2024-02-10'),
    ])
  })

  it('should return the week dates for 2024-04-06', () => {
    const result = getWeekForDate(date('2024-04-01'))
    expect(result).toEqual([
      date('2024-03-31'),
      date('2024-04-01'),
      date('2024-04-02'),
      date('2024-04-03'),
      date('2024-04-04'),
      date('2024-04-05'),
      date('2024-04-06'),
    ])
  })

  describe('setting different first days of the week', () => {
    it('should set monday as the first day of the week', () => {
      const result = getWeekForDate(date('2025-02-03'), 1)
      expect(result).toEqual([
        date('2025-02-03'),
        date('2025-02-04'),
        date('2025-02-05'),
        date('2025-02-06'),
        date('2025-02-07'),
        date('2025-02-08'),
        date('2025-02-09'),
      ])
    })

    it('should set saturday as the first day of the week', () => {
      const result = getWeekForDate(date('2025-02-08'), 6)
      expect(result).toEqual([
        date('2025-02-08'),
        date('2025-02-09'),
        date('2025-02-10'),
        date('2025-02-11'),
        date('2025-02-12'),
        date('2025-02-13'),
        date('2025-02-14'),
      ])
    })

    it('should set saturday as first day of the week, with a date that is not a saturday', () => {
      const result = getWeekForDate(date('2025-02-03'), 6)
      expect(result).toEqual([
        date('2025-02-01'),
        date('2025-02-02'),
        date('2025-02-03'),
        date('2025-02-04'),
        date('2025-02-05'),
        date('2025-02-06'),
        date('2025-02-07'),
      ])
    })
  })
})
