/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createTimePickerAppContext } from '../../factory'
import { cleanup, fireEvent, render } from '@testing-library/preact'
import { AppContext } from '../../utils/stateful/app-context'
import AppPopup from '../app-popup'
import { assertElementType } from '../../../../../libs/assertions/src'
import { afterEach, vi } from 'vitest'

describe('Time picker popup', () => {
  afterEach(() => {
    cleanup()
  })

  describe('rendering it with default settings', () => {
    it('should have 00 in both hours and minutes', () => {
      const $app = createTimePickerAppContext()
      render(
        <AppContext.Provider value={$app}>
          <AppPopup />
        </AppContext.Provider>
      )
      expect($app.timePickerState.currentTime.value).toBe('00:00')

      const hoursInput = document.querySelectorAll('.sx__time-input')[0]
      assertElementType<HTMLInputElement>(hoursInput, HTMLInputElement)
      expect(hoursInput).not.toBeNull()
      expect(hoursInput.value).toBe('00')

      const minutesInput = document.querySelectorAll('.sx__time-input')[1]
      assertElementType<HTMLInputElement>(minutesInput, HTMLInputElement)
      expect(minutesInput).not.toBeNull()
      expect(minutesInput.value).toBe('00')
    })

    it('should focus the hours input', () => {
      const $app = createTimePickerAppContext()
      render(
        <AppContext.Provider value={$app}>
          <AppPopup />
        </AppContext.Provider>
      )
      const hoursInput = document.querySelectorAll('.sx__time-input')[0]
      assertElementType<HTMLInputElement>(hoursInput, HTMLInputElement)
      expect(document.activeElement).toBe(hoursInput)
    })

    it.each([
      { initialValue: '00:00', expectedInitialHours: '12' },
      { initialValue: '12:00', expectedInitialHours: '12' },
      { initialValue: '23:59', expectedInitialHours: '11' },
    ])(
      'should render in 12-hour mode',
      ({ initialValue, expectedInitialHours }) => {
        const $app = createTimePickerAppContext()
        $app.config.is12Hour.value = true
        $app.timePickerState.currentTime.value = initialValue
        render(
          <AppContext.Provider value={$app}>
            <AppPopup />
          </AppContext.Provider>
        )
        const hoursInput = document.querySelectorAll('.sx__time-input')[0]
        assertElementType<HTMLInputElement>(hoursInput, HTMLInputElement)
        expect(hoursInput.value).toBe(expectedInitialHours)
      }
    )
  })

  describe('Interacting with the input and buttons', () => {
    it('should change the hours and minutes value and save', () => {
      const $app = createTimePickerAppContext()
      render(
        <AppContext.Provider value={$app}>
          <AppPopup />
        </AppContext.Provider>
      )
      const hoursInput = document.querySelectorAll('.sx__time-input')[0]
      assertElementType<HTMLInputElement>(hoursInput, HTMLInputElement)
      const minutesInput = document.querySelectorAll('.sx__time-input')[1]
      assertElementType<HTMLInputElement>(minutesInput, HTMLInputElement)
      expect($app.timePickerState.currentTime.value).toBe('00:00')

      fireEvent.input(hoursInput, { target: { value: '12' } })
      fireEvent.input(minutesInput, { target: { value: '20' } })
      const OKButton = document.querySelector('.sx__button-accept')
      assertElementType<HTMLButtonElement>(OKButton, HTMLButtonElement)
      fireEvent.click(OKButton)

      expect($app.timePickerState.currentTime.value).toBe('12:20')
    })

    it('should close the popup when clicking the cancel button', () => {
      const $app = createTimePickerAppContext()
      $app.timePickerState.isOpen.value = true
      render(
        <AppContext.Provider value={$app}>
          <AppPopup />
        </AppContext.Provider>
      )
      const cancelButton = document.querySelector('.sx__button-cancel')
      assertElementType<HTMLButtonElement>(cancelButton, HTMLButtonElement)
      fireEvent.click(cancelButton)

      expect($app.timePickerState.isOpen.value).toBe(false)
    })
  })

  describe('clicking outside', () => {
    it('should close the popup when clicking outside', () => {
      const $app = createTimePickerAppContext()
      $app.timePickerState.isOpen.value = true
      render(
        <AppContext.Provider value={$app}>
          <AppPopup />
        </AppContext.Provider>
      )
      const popup = document.querySelector('.sx__time-picker-popup')
      assertElementType<HTMLElement>(popup, HTMLElement)
      expect($app.timePickerState.isOpen.value).toBe(true)

      fireEvent.click(document.body)

      expect($app.timePickerState.isOpen.value).toBe(false)
    })
  })

  describe('pressing escape', () => {
    it('should close the popup', () => {
      const $app = createTimePickerAppContext()
      $app.timePickerState.isOpen.value = true
      render(
        <AppContext.Provider value={$app}>
          <AppPopup />
        </AppContext.Provider>
      )
      const popup = document.querySelector('.sx__time-picker-popup')
      assertElementType<HTMLElement>(popup, HTMLElement)
      expect($app.timePickerState.isOpen.value).toBe(true)

      fireEvent.keyDown(document.body, { key: 'Escape' })

      expect($app.timePickerState.isOpen.value).toBe(false)
    })

    it('should call the onEscapeKeyDown callback if provided', () => {
      const onEscapeKeyDown = vi.fn()
      const $app = createTimePickerAppContext({ onEscapeKeyDown })
      $app.timePickerState.isOpen.value = true
      render(
        <AppContext.Provider value={$app}>
          <AppPopup />
        </AppContext.Provider>
      )

      expect(onEscapeKeyDown).not.toHaveBeenCalled()

      fireEvent.keyDown(document.body, { key: 'Escape' })

      expect(onEscapeKeyDown).toHaveBeenCalled()
    })
  })
})
