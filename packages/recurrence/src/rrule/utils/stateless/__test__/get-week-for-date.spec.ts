import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getWeekForDate } from '../get-week-for-date'

describe('getWeekForDate', () => {
  it('should return the week number for 2024-01-01', () => {
    const result = getWeekForDate('2024-01-01')

    expect(result).toEqual([
      '2023-12-31',
      '2024-01-01',
      '2024-01-02',
      '2024-01-03',
      '2024-01-04',
      '2024-01-05',
      '2024-01-06',
    ])
  })

  it('should return the week number for 2024-01-31', () => {
    const result = getWeekForDate('2024-01-31')

    expect(result).toEqual([
      '2024-01-28',
      '2024-01-29',
      '2024-01-30',
      '2024-01-31',
      '2024-02-01',
      '2024-02-02',
      '2024-02-03',
    ])
  })

  it('should return the week dates for 2024-03-30', () => {
    const result = getWeekForDate('2024-03-30')
    expect(result).toEqual([
      '2024-03-24',
      '2024-03-25',
      '2024-03-26',
      '2024-03-27',
      '2024-03-28',
      '2024-03-29',
      '2024-03-30',
    ])
  })

  it('should return the week dates for 2024-02-04', () => {
    const result = getWeekForDate('2024-02-04')
    expect(result).toEqual([
      '2024-02-04',
      '2024-02-05',
      '2024-02-06',
      '2024-02-07',
      '2024-02-08',
      '2024-02-09',
      '2024-02-10',
    ])
  })

  it('should return the week dates for 2024-04-06', () => {
    const result = getWeekForDate('2024-04-01')
    expect(result).toEqual([
      '2024-03-31',
      '2024-04-01',
      '2024-04-02',
      '2024-04-03',
      '2024-04-04',
      '2024-04-05',
      '2024-04-06',
    ])
  })
})
