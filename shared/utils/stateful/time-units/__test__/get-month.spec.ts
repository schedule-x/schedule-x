import {
  describe,
  it,
  expect,
} from '../../../stateless/testing/unit/unit-testing-library.impl'
import { WeekDay } from '../../../../enums/time/week-day.enum.ts'
import TimeUnitsBuilder from '../time-units.builder.ts'
import { Month } from '../../../../enums/time/month.enum.ts'
import { expectWeekDatesToBe } from './utils/time-units-impl.spec-utils.ts'

describe('get month', () => {
  it('should get month with trailing and leading days, for 2023-07', () => {
    const underTest = new TimeUnitsBuilder().build()

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
    const underTest = new TimeUnitsBuilder().build()

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
      .withFirstDayOfWeek(WeekDay.SUNDAY)
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
      .withFirstDayOfWeek(WeekDay.SATURDAY)
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

  it('should throw an error for year 0', () => {
    const underTest = new TimeUnitsBuilder().build()

    expect(() =>
      underTest.getMonthWithTrailingAndLeadingDays(0, Month.JANUARY)
    ).toThrowError()
  })
})
