import {
  describe,
  it,
  expect, beforeEach, spyOn,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen } from '@testing-library/preact'
import MonthViewWeek from '../month-view-week'
import TimeUnitsBuilder from '../../../../../shared/utils/stateful/time-units/time-units.builder'
import { Month } from '../../../../../shared/enums/time/month.enum'
import {
  __createDatePickerAppSingleton__
} from "../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton";
import { AppContext } from "../../utils/stateful/app-context";

describe('MonthViewWeek', () => {
  const timeUnitsImpl = new TimeUnitsBuilder().build()

  beforeEach(() => {
    cleanup()
  })

  it('should render week', () => {
    const date = new Date(2023, Month.JULY, 23)
    const week = timeUnitsImpl.getWeekFor(date)
    const { container } = render(<MonthViewWeek week={week} />)

    expect(container.textContent).toContain('17')
    expect(container.textContent).toContain('18')
    expect(container.textContent).toContain('19')
    expect(container.textContent).toContain('20')
    expect(container.textContent).toContain('21')
    expect(container.textContent).toContain('22')
    expect(container.textContent).toContain('23')
  })

  it.each([
    ['17', '2023-07-17'],
    ['18', '2023-07-18'],
    ['19', '2023-07-19'],
    ['20', '2023-07-20'],
    ['21', '2023-07-21'],
    ['22', '2023-07-22'],
    ['23', '2023-07-23'],
  ])('should set new selected date', (dateOfMonth, expectedResult) => {
    const $app = __createDatePickerAppSingleton__()
    const date = new Date(2023, Month.JULY, 23)
    const week = timeUnitsImpl.getWeekFor(date)
    render(<AppContext.Provider value={$app}>
      <MonthViewWeek week={week} />
    </AppContext.Provider>)

    screen.getByText(dateOfMonth).click()

    expect($app.datePickerState.selectedDate.value).toBe(expectedResult)
  })

  it('should close date picker', () => {
    const $app = __createDatePickerAppSingleton__()
    $app.datePickerState.isOpen.value = true
    const closeSpy = spyOn($app.datePickerState, 'close')
    render(<AppContext.Provider value={$app}>
      <MonthViewWeek week={timeUnitsImpl.getWeekFor(new Date(2023, Month.JULY, 23))} />
    </AppContext.Provider>)
    expect($app.datePickerState.isOpen.value).toBe(true)

    screen.getByText('17').click()

    expect($app.datePickerState.isOpen.value).toBe(false)
  })
})
