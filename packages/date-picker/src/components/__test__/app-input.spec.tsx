import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  clearAllMocks,
  spyOn,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/preact'

import AppInput from '../app-input'
import { AppContext } from '../../utils/stateful/app-context'
import DatePickerAppSingleton from '../../utils/stateful/app-singleton/date-picker-app.singleton'
import { __createDatePickerAppSingleton__ } from '../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'

const DATE_PICKER_INPUT = 'date-picker-input'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  afterEach(() => {
    clearAllMocks()
  })

  it('should toggle date-picker open status when clicking input', async () => {
    const $app = __createDatePickerAppSingleton__()
    render(
      <AppContext.Provider value={$app}>
        <AppInput />
      </AppContext.Provider>
    )
    const datePickerIsOpenToggleSpy = spyOn(
      ($app as DatePickerAppSingleton).datePickerState,
      'toggle'
    )

    fireEvent.click(screen.getByTestId(DATE_PICKER_INPUT))

    await waitFor(() => {
      expect(datePickerIsOpenToggleSpy).toHaveBeenCalled()
    })
  })

  it('should display selected date', () => {
    render(
      <AppContext.Provider
        value={__createDatePickerAppSingleton__('2021-01-01', 'en-US')}
      >
        <AppInput />
      </AppContext.Provider>
    )

    const inputElement = screen.getByTestId(DATE_PICKER_INPUT)
    expect(screen.getByDisplayValue('1/1/2021') === inputElement).toBe(true)
  })

  it('should update displayed selected date', async () => {
    const expectedInitialDate = '1/1/2021'
    const expectedUpdatedDate = '1/2/2021'
    const $app = __createDatePickerAppSingleton__('2021-01-01', 'en-US')
    render(
      <AppContext.Provider value={$app}>
        <AppInput />
      </AppContext.Provider>
    )
    const inputElement = screen.getByTestId(DATE_PICKER_INPUT)
    expect(screen.getByDisplayValue(expectedInitialDate) === inputElement).toBe(
      true
    )

    $app.datePickerState.selectedDate.value = '2021-01-02'

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(expectedUpdatedDate) === inputElement
      ).toBe(true)
    })
  })
})
