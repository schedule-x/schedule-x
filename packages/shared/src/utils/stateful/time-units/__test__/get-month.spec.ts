import {
  describe,
  it,
  expect,
} from '../../../stateless/testing/unit/unit-testing-library.impl'
import { WeekDay } from '../../../../enums/time/week-day.enum'
import TimeUnitsBuilder from '../time-units.builder'
import { Month } from '../../../../enums/time/month.enum'
import { expectWeekDatesToBe } from './utils/time-units-impl.spec-utils'
import { createBaseConfig } from '@schedule-x/calendar/src/__test__/utils'
import { NoYearZeroError } from '../../../stateless/errors/no-year-zero.error'

describe('get month', () => {
  describe('getMonth', () => {
    it('should get all dates in a month', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      const result = underTest.getMonth(2023, Month.JULY)

      expect(result.length).toBe(31)
      expect(result[0].getDate()).toBe(1)
      expect(result[30].getDate()).toBe(31)
      expect(result.every(date => date.getMonth() === Month.JULY)).toBe(true)
      expect(result.every(date => date.getFullYear() === 2023)).toBe(true)
    })

    it('should get all dates in a month with 30 days', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      const result = underTest.getMonth(2023, Month.APRIL)

      expect(result.length).toBe(30)
      expect(result[0].getDate()).toBe(1)
      expect(result[29].getDate()).toBe(30)
      expect(result.every(date => date.getMonth() === Month.APRIL)).toBe(true)
      expect(result.every(date => date.getFullYear() === 2023)).toBe(true)
    })

    it('should get all dates in February of a leap year', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      const result = underTest.getMonth(2024, Month.FEBRUARY)

      expect(result.length).toBe(29)
      expect(result[0].getDate()).toBe(1)
      expect(result[28].getDate()).toBe(29)
      expect(result.every(date => date.getMonth() === Month.FEBRUARY)).toBe(true)
      expect(result.every(date => date.getFullYear() === 2024)).toBe(true)
    })

    it('should get all dates in February of a non-leap year', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      const result = underTest.getMonth(2023, Month.FEBRUARY)

      expect(result.length).toBe(28)
      expect(result[0].getDate()).toBe(1)
      expect(result[27].getDate()).toBe(28)
      expect(result.every(date => date.getMonth() === Month.FEBRUARY)).toBe(true)
      expect(result.every(date => date.getFullYear() === 2023)).toBe(true)
    })

    it('should throw an error for year 0', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      expect(() => underTest.getMonth(0, Month.JANUARY)).toThrow(NoYearZeroError)
    })
  })

  describe('getMonthWithTrailingAndLeadingDays', () => {
    it('should get month with trailing and leading days, for 2023-07', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      const result = underTest.getMonthWithTrailingAndLeadingDays(
        2023,
        Month.JULY
      )

      expectWeekDatesToBe(result[0], [26, 27, 28, 29, 30, 1, 2])
      expectWeekDatesToBe(result[1], [3, 4, 5, 6, 7, 8, 9])
      expectWeekDatesToBe(result[2], [10, 11, 12, 13, 14, 15, 16])
      expectWeekDatesToBe(result[3], [17, 18, 19, 20, 21, 22, 23])
      expectWeekDatesToBe(result[4], [24, 25, 26, 27, 28, 29, 30])
      expectWeekDatesToBe(result[5], [31, 1, 2, 3, 4, 5, 6])
    })

    it('should get month with trailing and leading days, for 2023-12', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      const result = underTest.getMonthWithTrailingAndLeadingDays(
        2023,
        Month.DECEMBER
      )

      expectWeekDatesToBe(result[0], [27, 28, 29, 30, 1, 2, 3])
      expectWeekDatesToBe(result[1], [4, 5, 6, 7, 8, 9, 10])
      expectWeekDatesToBe(result[2], [11, 12, 13, 14, 15, 16, 17])
      expectWeekDatesToBe(result[3], [18, 19, 20, 21, 22, 23, 24])
      expectWeekDatesToBe(result[4], [25, 26, 27, 28, 29, 30, 31])
    })

    it('should get month for 2023-12, with sunday as first day of week', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig({ firstDayOfWeek: WeekDay.SUNDAY }))
        .build()

      const result = underTest.getMonthWithTrailingAndLeadingDays(
        2023,
        Month.DECEMBER
      )

      expectWeekDatesToBe(result[0], [26, 27, 28, 29, 30, 1, 2])
      expectWeekDatesToBe(result[1], [3, 4, 5, 6, 7, 8, 9])
      expectWeekDatesToBe(result[2], [10, 11, 12, 13, 14, 15, 16])
      expectWeekDatesToBe(result[3], [17, 18, 19, 20, 21, 22, 23])
      expectWeekDatesToBe(result[4], [24, 25, 26, 27, 28, 29, 30])
      expectWeekDatesToBe(result[5], [31, 1, 2, 3, 4, 5, 6])
    })

    it('should get month for 2023-12, with saturday as first day of week', () => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig({ firstDayOfWeek: WeekDay.SATURDAY }))
        .build()

      const result = underTest.getMonthWithTrailingAndLeadingDays(
        2023,
        Month.DECEMBER
      )

      expectWeekDatesToBe(result[0], [25, 26, 27, 28, 29, 30, 1])
      expectWeekDatesToBe(result[1], [2, 3, 4, 5, 6, 7, 8])
      expectWeekDatesToBe(result[2], [9, 10, 11, 12, 13, 14, 15])
      expectWeekDatesToBe(result[3], [16, 17, 18, 19, 20, 21, 22])
      expectWeekDatesToBe(result[4], [23, 24, 25, 26, 27, 28, 29])
      expectWeekDatesToBe(result[5], [30, 31, 1, 2, 3, 4, 5])
    })
  })
})
