import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { renderComponent, getSelectedDay, getToday } from './utils'
import { createAppSingleton } from '../../../factory'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render week', () => {
    const $app = createAppSingleton()
    const date = Temporal.ZonedDateTime.from(
      '2023-07-23T00:00:00.00+00:00[UTC]'
    )
    const { container } = renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(date)
    )

    ;['17', '18', '19', '20', '21', '22', '23'].forEach((day) => {
      expect(container.textContent).toContain(day)
    })
  })

  it('should display selected date', () => {
    const date = Temporal.ZonedDateTime.from(
      '2023-08-08T00:00:00.00+00:00[UTC]'
    )
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
    const date = Temporal.ZonedDateTime.from(
      '2023-08-08T00:00:00.00+00:00[UTC]'
    )
    const $app = createAppSingleton({
      selectedDate: Temporal.PlainDate.from('2020-01-01'),
    })
    const { container } = renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(date)
    )

    const selectedDay = getSelectedDay(container)
    expect(selectedDay).toBeNull()
  })

  it.only("should display today's date", () => {
    const today = Temporal.Now.plainDateISO()
    const expectedTodaysDate = today.day
    const $app = createAppSingleton({ selectedDate: today })
    const { container } = renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(today)
    )

    const todaysDate = getToday(container)

    expect(todaysDate).not.toBeNull()
    expect(todaysDate?.textContent).toBe(expectedTodaysDate.toString())
  })
})
