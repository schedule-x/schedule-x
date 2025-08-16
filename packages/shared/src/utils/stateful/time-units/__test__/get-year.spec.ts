import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '../../../stateless/testing/unit/unit-testing-library.impl'
import TimeUnitsBuilder from '../time-units.builder'
import { Month } from '../../../../enums/time/month.enum'
import { NoYearZeroError } from '../../../stateless/errors/no-year-zero.error'
import { createBaseConfig } from '@schedule-x/calendar/src/__test__/utils'

describe('get year', () => {
  it.each([[-100], [-1], [1], [2023], [2024], [5000]])(
    'should get months for year %s',
    (year) => {
      const underTest = new TimeUnitsBuilder()
        .withConfig(createBaseConfig())
        .build()

      const result = underTest.getMonthsFor(year)

      expect(result.length).toBe(12)
      result.forEach((date) => expect(date.year).toBe(year))

      expect(result[0].month).toBe(Month.JANUARY)
      expect(result[1].month).toBe(Month.FEBRUARY)
      expect(result[2].month).toBe(Month.MARCH)
      expect(result[3].month).toBe(Month.APRIL)
      expect(result[4].month).toBe(Month.MAY)
      expect(result[5].month).toBe(Month.JUNE)
      expect(result[6].month).toBe(Month.JULY)
      expect(result[7].month).toBe(Month.AUGUST)
      expect(result[8].month).toBe(Month.SEPTEMBER)
      expect(result[9].month).toBe(Month.OCTOBER)
      expect(result[10].month).toBe(Month.NOVEMBER)
      expect(result[11].month).toBe(Month.DECEMBER)
    }
  )

  it('should throw an error for year 0', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()

    expect(() => underTest.getMonthsFor(0)).toThrow(NoYearZeroError)
  })
})
