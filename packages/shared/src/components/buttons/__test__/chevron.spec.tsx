import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render } from '@testing-library/preact'
import Chevron from '../chevron'
import { vi } from 'vitest'
import { assertElementType } from '../../../../../../libs/assertions/src'

const renderComponent = (props: {
  direction: 'previous' | 'next'
  onClick: () => void
  buttonText?: string
  disabled?: boolean
}) => {
  render(<Chevron {...props} />)
}

describe('Chevron button', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('When the button is in enabled state', () => {
    it('should be able to click the button', () => {
      const clickSpy = vi.fn()
      renderComponent({
        direction: 'previous',
        onClick: clickSpy,
        disabled: false,
      })

      const buttonElement = document.querySelector('.sx__chevron-wrapper')
      assertElementType<HTMLButtonElement>(buttonElement, HTMLButtonElement)

      expect(buttonElement.disabled).toBe(false)
    })
  })

  describe('When the button is in disabled state', () => {
    it('should not be able to click the button', () => {
      const clickSpy = vi.fn()
      renderComponent({
        direction: 'previous',
        onClick: clickSpy,
        disabled: true,
      })

      const buttonElement = document.querySelector('.sx__chevron-wrapper')
      assertElementType<HTMLButtonElement>(buttonElement, HTMLButtonElement)

      expect(buttonElement.disabled).toBe(true)
    })
  })
})
