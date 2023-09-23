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
})
