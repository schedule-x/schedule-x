import 'temporal-polyfill/global'
import {
  describe,
  it,
} from '../../../stateless/testing/unit/unit-testing-library.impl'
import TimeUnitsBuilder from '../time-units.builder'
import { Month } from '../../../../enums/time/month.enum'
import { expectWeekDatesToBe } from './utils/time-units-impl.spec-utils'
import { WeekDay } from '../../../../enums/time/week-day.enum'
import { createBaseConfig } from '@schedule-x/calendar/src/__test__/utils'

describe('get week', () => {
  it('should get week starting on Monday, for 2023-07-01', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()

    const result = underTest.getWeekFor(Temporal.PlainDate.from('2023-07-01'))

    expectWeekDatesToBe(result, [26, 27, 28, 29, 30, 1, 2])
  })

  it('should get week starting on Monday, for 2023-07-09', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()

    const result = underTest.getWeekFor(Temporal.PlainDate.from('2023-07-09'))

    expectWeekDatesToBe(result, [3, 4, 5, 6, 7, 8, 9])
  })

  it('should get week starting on Monday, for 2023-07-31', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()

    const result = underTest.getWeekFor(Temporal.PlainDate.from('2023-07-31'))

    expectWeekDatesToBe(result, [31, 1, 2, 3, 4, 5, 6])
  })
  it('should get week starting on Sunday, for 2023-07-01', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig({ firstDayOfWeek: WeekDay.SUNDAY }))
      .build()

    const result = underTest.getWeekFor(Temporal.PlainDate.from('2023-07-01'))

    expectWeekDatesToBe(result, [25, 26, 27, 28, 29, 30, 1])
  })

  it('should get a week starting on Sunday, for 2023-12-31', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig({ firstDayOfWeek: WeekDay.SUNDAY }))
      .build()

    const result = underTest.getWeekFor(Temporal.PlainDate.from('2023-12-31'))

    expectWeekDatesToBe(result, [31, 1, 2, 3, 4, 5, 6])
  })

  it('should get a week starting on Saturday, for 2024-02-29', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig({ firstDayOfWeek: WeekDay.SATURDAY }))
      .build()

    const result = underTest.getWeekFor(Temporal.PlainDate.from('2024-02-29'))

    expectWeekDatesToBe(result, [24, 25, 26, 27, 28, 29, 1])
  })
})
