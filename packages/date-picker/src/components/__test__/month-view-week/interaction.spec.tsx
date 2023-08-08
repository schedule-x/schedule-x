import {
  describe,
  it,
  expect,
  spyOn,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { cleanup, screen } from '@testing-library/preact'
import { Month } from '../../../../../../shared/enums/time/month.enum'
import { factory } from './utils'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should close date picker', () => {
    const $app = __createDatePickerAppSingleton__()
    $app.datePickerState.isOpen.value = true
    const closeSpy = spyOn($app.datePickerState, 'close')
    factory($app, $app.timeUnitsImpl.getWeekFor(new Date(2023, Month.JULY, 23)))
    expect($app.datePickerState.isOpen.value).toBe(true)

    screen.getByText('17').click()

    expect(closeSpy).toHaveBeenCalled()
    expect($app.datePickerState.isOpen.value).toBe(false)
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
    const week = $app.timeUnitsImpl.getWeekFor(date)
    factory($app, week)

    screen.getByText(dateOfMonth).click()

    expect($app.datePickerState.selectedDate.value).toBe(expectedResult)
  })
})
