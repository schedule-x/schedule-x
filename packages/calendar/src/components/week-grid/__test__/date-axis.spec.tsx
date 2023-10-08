import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import { Month } from '@schedule-x/shared/src/enums/time/month.enum'
import { cleanup, render, screen } from '@testing-library/preact'
import DateAxis from '../date-axis'
import { AppContext } from '../../../utils/stateful/app-context'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { __createAppWithViews__ } from '../../../utils/stateless/testing/__create-app-with-views__'

const factory = ($app: CalendarAppSingleton, week: Date[]) => {
  render(
    <AppContext.Provider value={$app}>
      <DateAxis week={week} />
    </AppContext.Provider>
  )
}

describe('DateAxis', () => {
  describe('displaying dates for a week', () => {
    const timeUnitsImpl = new TimeUnitsBuilder().build()

    afterEach(() => {
      cleanup()
    })

    it('should display dates for the week of 2023-09-09', () => {
      const week = timeUnitsImpl.getWeekFor(new Date(2023, Month.SEPTEMBER, 9))
      factory(__createAppWithViews__(), week)
      ;[4, 5, 6, 7, 8, 9, 10].forEach((date) => {
        expect(screen.getByText(date.toString())).not.toBeNull()
      })
    })

    it('should display the day names', () => {
      const week = timeUnitsImpl.getWeekFor(new Date(2023, Month.SEPTEMBER, 9))
      factory(__createAppWithViews__(), week)
      ;['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day) => {
        expect(screen.getByText(day)).not.toBeNull()
      })
    })

    it('should not highlight any date that is not today', () => {
      const week = timeUnitsImpl.getWeekFor(new Date(2023, Month.SEPTEMBER, 1))
      factory(__createAppWithViews__(), week)

      expect(
        document.querySelector('.sx__week-grid__date--is-today')
      ).toBeNull()
    })

    it('should highlight today', () => {
      const week = timeUnitsImpl.getWeekFor(new Date())
      factory(__createAppWithViews__(), week)

      expect(
        document.querySelector('.sx__week-grid__date--is-today')
      ).not.toBeNull()
    })
  })
})
