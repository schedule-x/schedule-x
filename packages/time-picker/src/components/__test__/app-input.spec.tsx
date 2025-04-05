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
import { translate, translations } from '@schedule-x/translations/src'
import { signal } from '@preact/signals'

describe('The time picker input (readonly, value display field)', () => {
  const translateFn = translate(signal('en-US'), signal(translations))

  afterEach(() => {
    cleanup()
  })

  describe('rendering with default config', () => {
    it('should render the input field with the correct label', () => {
      const $app = createTimePickerAppContext({}, translateFn)
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
      const $app = createTimePickerAppContext(
        { label: 'Custom Label' },
        translateFn
      )
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

  describe('rendering the input name', () => {
    it('should render with the default name', () => {
      const $app = createTimePickerAppContext({}, translateFn)
      render(
        <AppContext.Provider value={$app}>
          <AppInput />
        </AppContext.Provider>
      )

      const input = document.querySelector('.sx__time-picker-input')
      assertElementType<HTMLInputElement>(input, HTMLInputElement)
      expect(input?.name).toBe('time')
    })

    it('should render the input field with the correct name', () => {
      const $app = createTimePickerAppContext(
        { name: 'custom-name' },
        translateFn
      )
      render(
        <AppContext.Provider value={$app}>
          <AppInput />
        </AppContext.Provider>
      )

      const input = document.querySelector('.sx__time-picker-input')
      assertElementType<HTMLInputElement>(input, HTMLInputElement)
      expect(input?.name).toBe('custom-name')
    })
  })

  describe('when the popup is opened', () => {
    it('should add the active class to the wrapper', async () => {
      const $app = createTimePickerAppContext({}, translateFn)
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

  describe('opening the popup', () => {
    it('should open the popup but not set wrapperElement when the input is focused, if no teleport is defined', async () => {
      const $app = createTimePickerAppContext({}, translateFn)
      render(
        <AppContext.Provider value={$app}>
          <AppInput />
        </AppContext.Provider>
      )

      const input = document.querySelector('.sx__time-picker-input')
      if (!(input instanceof HTMLElement)) throw new Error('Input not found')
      input.focus()

      await waitFor(() => {
        expect($app.timePickerState.isOpen.value).toBe(true)
        expect($app.timePickerState.inputWrapperElement.value).not.toBeDefined()
      })
    })

    it('should open the popup and set wrapperElement when the input is focused, if teleport is defined', async () => {
      const $app = createTimePickerAppContext(
        { teleportTo: document.body },
        translateFn
      )
      $app.config.teleportTo.value = document.body
      render(
        <AppContext.Provider value={$app}>
          <AppInput />
        </AppContext.Provider>
      )

      const input = document.querySelector('.sx__time-picker-input')
      if (!(input instanceof HTMLElement)) throw new Error('Input not found')
      input.focus()

      await waitFor(() => {
        expect($app.timePickerState.isOpen.value).toBe(true)
        expect($app.timePickerState.inputWrapperElement.value).toBeDefined()
      })
    })
  })
})
