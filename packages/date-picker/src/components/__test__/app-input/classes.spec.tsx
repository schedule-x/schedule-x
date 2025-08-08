import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { waitFor, cleanup } from '@testing-library/preact'
import { assertIsDIV } from '../../../../../../libs/assertions/src'

import {
  renderComponent,
  getInputElement,
  getInputWrapperElement,
} from './utils'
import { createAppSingleton } from '../../../factory'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should not have active class upon rendering', () => {
    renderComponent(createAppSingleton())
    const wrapperElement = getInputWrapperElement()
    assertIsDIV(wrapperElement)

    expect(wrapperElement.classList.contains('sx__date-input--active')).toBe(
      false
    )
  })

  it('should have active class when focused', async () => {
    renderComponent(createAppSingleton())
    const wrapperElement = getInputWrapperElement()
    assertIsDIV(wrapperElement)
    const inputElement = getInputElement()

    inputElement.click()

    await waitFor(() => {
      expect(wrapperElement.classList.contains('sx__date-input--active')).toBe(
        true
      )
    })
  })
})
