import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { waitFor, cleanup } from '@testing-library/preact'

import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { factory, getInputElement, getInputWrapperElement } from './utils'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should not have active class upon rendering', () => {
    factory(__createDatePickerAppSingleton__())
    const wrapperElement = getInputWrapperElement()

    expect(wrapperElement.classList.contains('sx__date-input--active')).toBe(
      false
    )
  })

  it('should have active class when focused', async () => {
    factory(__createDatePickerAppSingleton__())
    const wrapperElement = getInputWrapperElement()
    const inputElement = getInputElement()

    inputElement.click()

    await waitFor(() => {
      expect(wrapperElement.classList.contains('sx__date-input--active')).toBe(
        true
      )
    })
  })
})
