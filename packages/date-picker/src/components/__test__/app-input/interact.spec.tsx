import {
  describe,
  it,
  expect,
  spyOn,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/preact'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import { factory } from './utils'

const DATE_PICKER_INPUT = 'date-picker-input'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should toggle date-picker open status when clicking input', async () => {
    const $app = __createDatePickerAppSingleton__()
    factory($app)
    const datePickerIsOpenToggleSpy = spyOn(
      ($app as DatePickerAppSingleton).datePickerState,
      'toggle'
    )

    fireEvent.click(screen.getByTestId(DATE_PICKER_INPUT))

    await waitFor(() => {
      expect(datePickerIsOpenToggleSpy).toHaveBeenCalled()
    })
  })

  it('should not update selected date on entering a date without pressing enter', () => {
    const $app = __createDatePickerAppSingleton__('2021-01-01', 'en-US')
    factory($app)
    const inputElement = screen.getByTestId(DATE_PICKER_INPUT)

    fireEvent.input(inputElement, { target: { value: '1/2/2021' } })
    fireEvent.keyUp(inputElement, { key: ' ' })

    expect($app.datePickerState.selectedDate.value).toBe('2021-01-01')
  })

  it('should update selected date on entering a date and pressing enter', () => {
    const $app = __createDatePickerAppSingleton__('2021-01-01', 'en-US')
    factory($app)
    const inputElement = screen.getByTestId(DATE_PICKER_INPUT)

    fireEvent.input(inputElement, { target: { value: '1/2/2021' } })
    fireEvent.keyUp(inputElement, { key: 'Enter' })

    expect($app.datePickerState.selectedDate.value).toBe('2021-01-02')
  })
})
