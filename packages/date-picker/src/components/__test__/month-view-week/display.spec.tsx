import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { Month } from '@schedule-x/shared/src/enums/time/month.enum'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { renderComponent, getSelectedDay, getToday } from './utils'
import { createAppSingleton } from '../../../factory'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render week', () => {
    const $app = createAppSingleton()
    const date = new Date(2023, Month.JULY, 23)
    const { container } = renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(date)
    )

    ;['17', '18', '19', '20', '21', '22', '23'].forEach((day) => {
      expect(container.textContent).toContain(day)
    })
  })

  it('should display selected date', () => {
    const date = new Date(2023, Month.AUGUST, 8)
    const $app = createAppSingleton({ selectedDate: toDateString(date) })
    const { container } = renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(date)
    )

    const selectedDay = getSelectedDay(container)
    expect(selectedDay).not.toBeNull()
    expect(selectedDay?.textContent).toBe('8')
  })

  it('should not display any selected date', () => {
    const date = new Date(2023, Month.AUGUST, 8)
    const $app = createAppSingleton({ selectedDate: '2020-01-01' })
    const { container } = renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(date)
    )

    const selectedDay = getSelectedDay(container)
    expect(selectedDay).toBeNull()
  })

  it("should display today's date", () => {
    const today = new Date()
    const expectedTodaysDate = today.getDate()
    const $app = createAppSingleton({ selectedDate: toDateString(today) })
    const { container } = renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(today)
    )

    const todaysDate = getToday(container)

    expect(todaysDate).not.toBeNull()
    expect(todaysDate?.textContent).toBe(expectedTodaysDate.toString())
  })
})
