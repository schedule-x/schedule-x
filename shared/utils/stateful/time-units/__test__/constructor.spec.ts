import {
  describe,
  expect,
  it,
} from '../../../stateless/testing/unit/unit-testing-library.impl.ts'
import { WeekDay } from '../../../../enums/time/week-day.enum.ts'
import TimeUnitsBuilder from '../time-units.builder.ts'

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
