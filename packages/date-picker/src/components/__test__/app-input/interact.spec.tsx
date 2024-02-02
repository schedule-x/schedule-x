import {
  describe,
  it,
  expect,
  spyOn,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent, waitFor } from '@testing-library/preact'
import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import {
  renderComponent,
  getInputElement,
  setNewDateAndPressEnter,
} from './utils'
import { createAppSingleton } from '../../../factory'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should toggle date-picker open status when clicking input', async () => {
    const $app = createAppSingleton()
    renderComponent($app)
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
    renderComponent($app)
    const inputElement = getInputElement()

    fireEvent.input(inputElement, { target: { value: '1/2/2021' } })
    fireEvent.keyUp(inputElement, { key: ' ' })

    expect($app.datePickerState.selectedDate.value).toBe(selectedDate)
  })

  it('should update selected date on entering a date and pressing enter', () => {
    const $app = createAppSingleton({ selectedDate: '2021-01-01' })
    renderComponent($app)

    setNewDateAndPressEnter('1/2/2021')

    expect($app.datePickerState.selectedDate.value).toBe('2021-01-02')
  })

  it('should not update input upon externally firing change event', () => {
    const $app = createAppSingleton({ selectedDate: '2021-01-01' })
    renderComponent($app)
    const externalInput = document.createElement('input')
    document.body.appendChild(externalInput)
    expect($app.datePickerState.inputDisplayedValue.value).toBe('1/1/2021')

    fireEvent.change(externalInput, { target: { value: 'hello world' } })

    expect($app.datePickerState.inputDisplayedValue.value).toBe('1/1/2021')
  })
})
