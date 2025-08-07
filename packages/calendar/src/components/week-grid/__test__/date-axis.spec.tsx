import 'temporal-polyfill/global'
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import { cleanup, render, screen } from '@testing-library/preact'
import DateAxis from '../date-axis'
import { AppContext } from '../../../utils/stateful/app-context'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { __createAppWithViews__ } from '../../../utils/stateless/testing/__create-app-with-views__'
import { beforeEach } from 'vitest'
import { createBaseConfig } from '../../../__test__/utils'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'

const renderComponent = ($app: CalendarAppSingleton, week: Temporal.ZonedDateTime[]) => {
  render(
    <AppContext.Provider value={$app}>
      <DateAxis week={week} />
    </AppContext.Provider>
  )
}

describe('DateAxis', () => {
  let timeUnitsImpl = new TimeUnitsBuilder()
    .withConfig(createBaseConfig())
    .build()

  beforeEach(() => {
    timeUnitsImpl = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()
  })

  afterEach(() => {
    cleanup()
  })

  describe('displaying dates for a week', () => {
    it('should display dates for the week of 2023-09-09', () => {
      const week = timeUnitsImpl.getWeekFor(Temporal.PlainDate.from('2023-09-09'))
      renderComponent(__createAppWithViews__(), week)
      ;[4, 5, 6, 7, 8, 9, 10].forEach((date) => {
        expect(screen.getByText(date.toString())).not.toBeNull()
      })
    })

    it('should display the day names', () => {
      const week = timeUnitsImpl.getWeekFor(Temporal.PlainDate.from('2023-09-09'))
      renderComponent(__createAppWithViews__(), week)
      ;['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day) => {
        expect(screen.getByText(day)).not.toBeNull()
      })
    })

    it('should not highlight any date that is not today', () => {
      const week = timeUnitsImpl.getWeekFor(Temporal.PlainDate.from('2023-09-01'))
      renderComponent(__createAppWithViews__(), week)

      expect(
        document.querySelector('.sx__week-grid__date--is-today')
      ).toBeNull()
    })

    it('should highlight today', () => {
      const week = timeUnitsImpl.getWeekFor(Temporal.PlainDate.from(Temporal.Now.plainDateISO()))
      renderComponent(__createAppWithViews__(), week)

      expect(
        document.querySelector('.sx__week-grid__date--is-today')
      ).not.toBeNull()
    })

    it('should have data-date attributes for every day', () => {
      const week = timeUnitsImpl.getWeekFor(Temporal.PlainDate.from('2023-09-01'))
      renderComponent(__createAppWithViews__(), week)

      const allDayElements = document.querySelectorAll('.sx__week-grid__date')
      expect(allDayElements[0]?.getAttribute('data-date')).toBe('2023-08-28')
      expect(allDayElements[1]?.getAttribute('data-date')).toBe('2023-08-29')
      expect(allDayElements[2]?.getAttribute('data-date')).toBe('2023-08-30')
      expect(allDayElements[3]?.getAttribute('data-date')).toBe('2023-08-31')
      expect(allDayElements[4]?.getAttribute('data-date')).toBe('2023-09-01')
      expect(allDayElements[5]?.getAttribute('data-date')).toBe('2023-09-02')
      expect(allDayElements[6]?.getAttribute('data-date')).toBe('2023-09-03')
    })
  })

  describe('a week starting on Monday', () => {
    it('should display the day names in the correct order', () => {
      const week = timeUnitsImpl.getWeekFor(Temporal.PlainDate.from('2023-09-01'))
      renderComponent(__createAppWithViews__(), week)

      const allDayElements = document.querySelectorAll('.sx__week-grid__date')
      expect(allDayElements[0]?.classList).toContain('sx__monday')
      expect(allDayElements[1]?.classList).toContain('sx__tuesday')
      expect(allDayElements[2]?.classList).toContain('sx__wednesday')
      expect(allDayElements[3]?.classList).toContain('sx__thursday')
      expect(allDayElements[4]?.classList).toContain('sx__friday')
      expect(allDayElements[5]?.classList).toContain('sx__saturday')
      expect(allDayElements[6]?.classList).toContain('sx__sunday')
    })
  })

  describe('a week starting on Sunday', () => {
    it('should display the day names in the correct order', () => {
      timeUnitsImpl = new TimeUnitsBuilder()
        .withConfig(createBaseConfig({ firstDayOfWeek: WeekDay.SUNDAY }))
        .build()
      const week = timeUnitsImpl.getWeekFor(Temporal.PlainDate.from('2023-09-03'))
      renderComponent(
        __createAppWithViews__({
          firstDayOfWeek: WeekDay.SUNDAY,
        }),
        week
      )

      const allDayElements = document.querySelectorAll('.sx__week-grid__date')
      expect(allDayElements[0]?.classList).toContain('sx__sunday')
      expect(allDayElements[1]?.classList).toContain('sx__monday')
      expect(allDayElements[2]?.classList).toContain('sx__tuesday')
      expect(allDayElements[3]?.classList).toContain('sx__wednesday')
      expect(allDayElements[4]?.classList).toContain('sx__thursday')
      expect(allDayElements[5]?.classList).toContain('sx__friday')
      expect(allDayElements[6]?.classList).toContain('sx__saturday')
    })
  })
})
