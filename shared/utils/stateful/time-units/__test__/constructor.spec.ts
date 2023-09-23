import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl.ts'
import { WeekDay } from '../../../../enums/time/week-day.enum'
import TimeUnitsBuilder from '../time-units.builder'

describe('constructor', () => {
  it('should set first day of week', () => {
    const expectedFirstDayOfWeek = WeekDay.SUNDAY
    const underTest = new TimeUnitsBuilder()
      .withFirstDayOfWeek(expectedFirstDayOfWeek)
      .build()
    expect(underTest.firstDayOfWeek).toBe(expectedFirstDayOfWeek)
  })

  it('should set default first day of week', () => {
    const underTest = new TimeUnitsBuilder().build()
    expect(underTest.firstDayOfWeek).toBe(WeekDay.MONDAY)
  })
})
