import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { waitFor, cleanup } from '@testing-library/preact'

import { factory, getInputElement, getInputWrapperElement } from './utils'
import { createAppSingleton } from '../../../factory'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should not have active class upon rendering', () => {
    factory(createAppSingleton())
    const wrapperElement = getInputWrapperElement()

    expect(wrapperElement.classList.contains('sx__date-input--active')).toBe(
      false
    )
  })

  it('should have active class when focused', async () => {
    factory(createAppSingleton())
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
