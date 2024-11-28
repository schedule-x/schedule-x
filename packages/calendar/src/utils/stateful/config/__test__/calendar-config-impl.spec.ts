import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarConfigBuilder from '../calendar-config.builder'

describe('CalendarConfigImpl', () => {
  describe('if it should display hybrid days or not', () => {
    it.each([
      { start: '03:00', end: '03:00' },
      { start: '23:30', end: '06:00' },
      { start: '23:59', end: '00:00' },
    ])(
      'should display hybrid days if the day boundaries span 2 actual days',
      (dayBoundaries) => {
        const config = new CalendarConfigBuilder()
          .withDayBoundaries(dayBoundaries)
          .build()

        expect(config.isHybridDay).toBe(true)
      }
    )

    it.each([
      { start: '00:00', end: '00:00' },
      { start: '00:00', end: '23:59' },
      { start: '06:00', end: '23:30' },
    ])(
      'should not display hybrid days if the day boundaries span 1 actual day',
      (dayBoundaries) => {
        const config = new CalendarConfigBuilder()
          .withDayBoundaries(dayBoundaries)
          .build()

        expect(config.isHybridDay).toBe(false)
      }
    )
  })

  describe('configuring first day of week', () => {
    /**
     * Might look like a stupid test, but since 0 is falsy, lacking this test led to an error in v2.0.0
     * */
    it.each([[0], [1], [2], [3], [4], [5], [6]])(
      'should set the first day of the week to %s',
      (firstDayOfWeek) => {
        const config = new CalendarConfigBuilder()
          .withFirstDayOfWeek(firstDayOfWeek)
          .build()

        expect(config.firstDayOfWeek.value).toBe(firstDayOfWeek)
      }
    )
  })
})
