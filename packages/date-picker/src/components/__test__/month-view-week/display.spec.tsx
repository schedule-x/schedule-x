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
import { factory, getSelectedDay, getToday } from './utils'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render week', () => {
    const $app = __createDatePickerAppSingleton__()
    const date = new Date(2023, Month.JULY, 23)
    const { container } = factory($app, $app.timeUnitsImpl.getWeekFor(date))

    ;['17', '18', '19', '20', '21', '22', '23'].forEach((day) => {
      expect(container.textContent).toContain(day)
    })
  })

  it('should display selected date', () => {
    const date = new Date(2023, Month.AUGUST, 8)
    const $app = __createDatePickerAppSingleton__(toDateString(date))
    const { container } = factory($app, $app.timeUnitsImpl.getWeekFor(date))

    const selectedDay = getSelectedDay(container)
    expect(selectedDay).not.toBeNull()
    expect(selectedDay?.textContent).toBe('8')
  })

  it('should not display any selected date', () => {
    const date = new Date(2023, Month.AUGUST, 8)
    const $app = __createDatePickerAppSingleton__('2020-01-01')
    const { container } = factory($app, $app.timeUnitsImpl.getWeekFor(date))

    const selectedDay = getSelectedDay(container)
    expect(selectedDay).toBeNull()
  })

  it("should display today's date", () => {
    const today = new Date()
    const expectedTodaysDate = today.getDate()
    const $app = __createDatePickerAppSingleton__(toDateString(today))
    const { container } = factory($app, $app.timeUnitsImpl.getWeekFor(today))

    const todaysDate = getToday(container)

    expect(todaysDate).not.toBeNull()
    expect(todaysDate?.textContent).toBe(expectedTodaysDate.toString())
  })
})
