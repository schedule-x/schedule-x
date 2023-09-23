import {
  describe,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl.ts'
import TimeUnitsBuilder from '../time-units.builder'
import { Month } from '../../../../enums/time/month.enum'
import { expectWeekDatesToBe } from './utils/time-units-impl.spec-utils'
import { WeekDay } from '../../../../enums/time/week-day.enum'

describe('get week', () => {
  it('should get week starting on Monday, for 2023-07-01', () => {
    const underTest = new TimeUnitsBuilder().build()

    const result = underTest.getWeekFor(new Date(2023, Month.JULY, 1))

    expectWeekDatesToBe(result, [26, 27, 28, 29, 30, 1, 2])
  })

  it('should get week starting on Monday, for 2023-07-09', () => {
    const underTest = new TimeUnitsBuilder().build()

    const result = underTest.getWeekFor(new Date(2023, Month.JULY, 9))

    expectWeekDatesToBe(result, [3, 4, 5, 6, 7, 8, 9])
  })

  it('should get week starting on Monday, for 2023-07-31', () => {
    const underTest = new TimeUnitsBuilder().build()

    const result = underTest.getWeekFor(new Date(2023, Month.JULY, 31))

    expectWeekDatesToBe(result, [31, 1, 2, 3, 4, 5, 6])
  })
  it('should get week starting on Sunday, for 2023-07-01', () => {
    const underTest = new TimeUnitsBuilder()
      .withFirstDayOfWeek(WeekDay.SUNDAY)
      .build()

    const result = underTest.getWeekFor(new Date(2023, Month.JULY, 1))

    expectWeekDatesToBe(result, [25, 26, 27, 28, 29, 30, 1])
  })

  it('should get a week starting on Sunday, for 2023-12-31', () => {
    const underTest = new TimeUnitsBuilder()
      .withFirstDayOfWeek(WeekDay.SUNDAY)
      .build()

    const result = underTest.getWeekFor(new Date(2023, Month.DECEMBER, 31))

    expectWeekDatesToBe(result, [31, 1, 2, 3, 4, 5, 6])
  })

  it('should get a week starting on Saturday, for 2024-02-29', () => {
    const underTest = new TimeUnitsBuilder()
      .withFirstDayOfWeek(WeekDay.SATURDAY)
      .build()

    const result = underTest.getWeekFor(new Date(2024, Month.FEBRUARY, 29))

    expectWeekDatesToBe(result, [24, 25, 26, 27, 28, 29, 1])
  })
})
