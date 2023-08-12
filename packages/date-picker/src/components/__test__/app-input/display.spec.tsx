import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  clearAllMocks,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { screen, waitFor, cleanup } from '@testing-library/preact'

import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { factory } from './utils'

const DATE_PICKER_INPUT = 'date-picker-input'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  afterEach(() => {
    clearAllMocks()
  })

  it('should display selected date', () => {
    factory(__createDatePickerAppSingleton__('2021-01-01', 'en-US'))

    const inputElement = screen.getByTestId(DATE_PICKER_INPUT)
    expect(screen.getByDisplayValue('1/1/2021') === inputElement).toBe(true)
  })

  it('should update displayed selected date', async () => {
    const expectedInitialDate = '1/1/2021'
    const expectedUpdatedDate = '1/2/2021'
    const $app = __createDatePickerAppSingleton__('2021-01-01', 'en-US')
    factory($app)
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
