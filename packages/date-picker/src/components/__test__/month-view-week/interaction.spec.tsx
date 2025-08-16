import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  spyOn,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen } from '@testing-library/preact'
import { clickByDate, renderComponent } from './utils'
import { createAppSingleton } from '../../../factory'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should close date picker', () => {
    const $app = createAppSingleton()
    $app.datePickerState.isOpen.value = true
    const closeSpy = spyOn($app.datePickerState, 'close')
    renderComponent(
      $app,
      $app.timeUnitsImpl.getWeekFor(
        Temporal.ZonedDateTime.from('2023-07-23T00:00:00.00+00:00[UTC]')
      )
    )
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
    const $app = createAppSingleton()
    const date = Temporal.ZonedDateTime.from(
      '2023-07-23T00:00:00.00+00:00[UTC]'
    )
    const week = $app.timeUnitsImpl.getWeekFor(date)
    renderComponent($app, week)

    clickByDate(dateOfMonth)

    expect($app.datePickerState.selectedDate.value).toEqual(
      Temporal.PlainDate.from(expectedResult)
    )
  })
})
