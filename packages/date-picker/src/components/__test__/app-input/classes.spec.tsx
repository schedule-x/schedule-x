import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { screen, waitFor, cleanup } from '@testing-library/preact'

import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { factory } from './utils'

const DATE_PICKER_INPUT_TEST_ID = 'date-picker-input'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should not have active class upon rendering', () => {
    factory(__createDatePickerAppSingleton__('2021-01-01', 'en-US'))

    const wrapperElement = document.querySelector(
      '.sx__date-input-wrapper'
    ) as HTMLDivElement
    expect(wrapperElement.classList.contains('sx__date-input--active')).toBe(
      false
    )
  })

  it('should have active class when focused', async () => {
    factory(__createDatePickerAppSingleton__('2021-01-01', 'en-US'))

    const wrapperElement = document.querySelector(
      '.sx__date-input-wrapper'
    ) as HTMLDivElement
    const inputElement = screen.getByTestId(DATE_PICKER_INPUT_TEST_ID)
    inputElement.click()

    await waitFor(() => {
      expect(wrapperElement.classList.contains('sx__date-input--active')).toBe(
        true
      )
    })
  })
})
