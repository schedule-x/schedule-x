import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { Month } from '../../../../../../shared/enums/time/month.enum'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { toDateString } from '../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { factory } from './utils'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render week', () => {
    const $app = __createDatePickerAppSingleton__()
    const date = new Date(2023, Month.JULY, 23)
    const week = $app.timeUnitsImpl.getWeekFor(date)
    const { container } = factory($app, week)

    expect(container.textContent).toContain('17')
    expect(container.textContent).toContain('18')
    expect(container.textContent).toContain('19')
    expect(container.textContent).toContain('20')
    expect(container.textContent).toContain('21')
    expect(container.textContent).toContain('22')
    expect(container.textContent).toContain('23')
  })

  it('should display selected date', () => {
    const date = new Date(2023, Month.AUGUST, 8)
    const $app = __createDatePickerAppSingleton__(toDateString(date))
    const week = $app.timeUnitsImpl.getWeekFor(date)
    const { container } = factory($app, week)

    const selectedDay = container.querySelector(
      '.sx__date-picker__day.sx__date-picker__day--selected'
    )
    expect(selectedDay).not.toBeNull()
    expect(selectedDay?.textContent).toBe('8')
  })

  it('should not display any selected date', () => {
    const date = new Date(2023, Month.AUGUST, 8)
    const $app = __createDatePickerAppSingleton__('2020-01-01')
    const week = $app.timeUnitsImpl.getWeekFor(date)
    const { container } = factory($app, week)

    const selectedDay = container.querySelector(
      '.sx__date-picker__day.sx__date-picker__day--selected'
    )
    expect(selectedDay).toBeNull()
  })

  it("should display today's date", () => {
    const today = new Date()
    const expectedTodaysDate = today.getDate()
    const $app = __createDatePickerAppSingleton__(toDateString(today))
    const week = $app.timeUnitsImpl.getWeekFor(today)
    const { container } = factory($app, week)

    const todaysDate = container.querySelector(
      '.sx__date-picker__day.sx__date-picker__day--today'
    )

    expect(todaysDate).not.toBeNull()
    expect(todaysDate?.textContent).toBe(expectedTodaysDate.toString())
  })
})
