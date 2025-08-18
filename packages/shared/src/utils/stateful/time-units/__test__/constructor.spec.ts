import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '../../../stateless/testing/unit/unit-testing-library.impl'
import { WeekDay } from '../../../../enums/time/week-day.enum'
import TimeUnitsBuilder from '../time-units.builder'
import { createBaseConfig } from '@schedule-x/calendar/src/__test__/utils'

describe('constructor', () => {
  it('should set first day of week', () => {
    const expectedFirstDayOfWeek = WeekDay.SUNDAY
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig({ firstDayOfWeek: expectedFirstDayOfWeek }))
      .build()
    expect(underTest.firstDayOfWeek).toBe(expectedFirstDayOfWeek)
  })

  it('should set default first day of week', () => {
    const underTest = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()
    expect(underTest.firstDayOfWeek).toBe(WeekDay.MONDAY)
  })
})
