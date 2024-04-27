import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, waitFor } from '@testing-library/preact'
import AppInput from '../app-input'
import { createTimePickerAppContext } from '../../factory'
import { AppContext } from '../../utils/stateful/app-context'
import { assertElementType } from '../../../../../libs/assertions/src'

describe('The time picker input (readonly, value display field)', () => {
  afterEach(() => {
    cleanup()
  })

  describe('rendering with default config', () => {
    it('should render the input field with the correct label', () => {
      const $app = createTimePickerAppContext()
      render(
        <AppContext.Provider value={$app}>
          <AppInput />
        </AppContext.Provider>
      )

      const label = document.querySelector('.sx__time-input-label')
      assertElementType<HTMLLabelElement>(label, HTMLLabelElement)
      expect(label?.innerHTML).toBe('Time')
    })
  })

  describe('rendering with a custom label', () => {
    it('should render the input field with the correct label', () => {
      const $app = createTimePickerAppContext({ label: 'Custom Label' })
      render(
        <AppContext.Provider value={$app}>
          <AppInput />
        </AppContext.Provider>
      )

      const label = document.querySelector('.sx__time-input-label')
      assertElementType<HTMLLabelElement>(label, HTMLLabelElement)
      expect(label?.innerHTML).toBe('Custom Label')
    })
  })

  describe('when the popup is opened', () => {
    it('should add the active class to the wrapper', async () => {
      const $app = createTimePickerAppContext()
      render(
        <AppContext.Provider value={$app}>
          <AppInput />
        </AppContext.Provider>
      )
      const wrapper = document.querySelector('.sx__time-input-wrapper')
      expect(wrapper?.classList.contains('sx__time-input--active')).toBe(false)

      $app.timePickerState.isOpen.value = true

      await waitFor(() => {
        expect(wrapper?.classList.contains('sx__time-input--active')).toBe(true)
      })
    })
  })
})
