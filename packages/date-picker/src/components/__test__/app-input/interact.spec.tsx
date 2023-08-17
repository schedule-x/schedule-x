import {
  describe,
  it,
  expect,
  spyOn,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent, waitFor } from '@testing-library/preact'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import { factory, getInputElement } from './utils'
import { createAppSingleton } from '../../../factory'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should toggle date-picker open status when clicking input', async () => {
    const $app = createAppSingleton()
    factory($app)
    const datePickerOpenSpy = spyOn(
      ($app as DatePickerAppSingleton).datePickerState,
      'open'
    )

    fireEvent.click(getInputElement())

    await waitFor(() => {
      expect(datePickerOpenSpy).toHaveBeenCalled()
    })
  })

  it('should not update selected date on entering a date without pressing enter', () => {
    const selectedDate = '2021-01-01'
    const $app = createAppSingleton({ selectedDate: selectedDate })
    factory($app)
    const inputElement = getInputElement()

    fireEvent.input(inputElement, { target: { value: '1/2/2021' } })
    fireEvent.keyUp(inputElement, { key: ' ' })

    expect($app.datePickerState.selectedDate.value).toBe(selectedDate)
  })

  it('should update selected date on entering a date and pressing enter', () => {
    const $app = createAppSingleton({ selectedDate: '2021-01-01' })
    factory($app)
    const inputElement = getInputElement()

    fireEvent.input(inputElement, { target: { value: '1/2/2021' } })
    fireEvent.keyUp(inputElement, { key: 'Enter' })

    expect($app.datePickerState.selectedDate.value).toBe('2021-01-02')
  })
})
