import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, waitFor } from '@testing-library/preact'
import { createAppSingleton } from '../../../factory'
import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import AppWrapper from '../../app-wrapper'
import {
  assertIsNotShowingPopup,
  assertIsShowingPopup,
  focusInputChevronAndPressEnter,
} from './utils'

const getFocusedElement = () => document.querySelector('[data-focus="true"]')

const navigateWithKey = (key: string) => {
  const focusedElement = getFocusedElement()
  focusedElement?.dispatchEvent(new KeyboardEvent('keydown', { key }))
}

describe('Navigating date picker with keyboard', () => {
  describe('Opening the date picker and selecting a date', () => {
    let $app: DatePickerAppSingleton

    beforeEach(() => {
      $app = createAppSingleton({
        selectedDate: '2021-01-01',
      })
    })

    afterEach(() => {
      cleanup()
    })

    it('should open the date picker popup', async () => {
      render(<AppWrapper $app={$app} />)
      await assertIsNotShowingPopup()

      focusInputChevronAndPressEnter()

      await assertIsShowingPopup()
    })

    it('should navigate the date picker using the arrow keys and select a date', async () => {
      render(<AppWrapper $app={$app} />)
      await assertIsNotShowingPopup()
      focusInputChevronAndPressEnter()
      await assertIsShowingPopup()

      await waitFor(() => {
        navigateWithKey('ArrowRight')
        expect($app.datePickerState.datePickerDate.value).toBe('2021-01-02')
      })

      await waitFor(() => {
        navigateWithKey('ArrowLeft')
        expect($app.datePickerState.datePickerDate.value).toBe('2021-01-01')
      })

      await waitFor(() => {
        navigateWithKey('ArrowUp')
        navigateWithKey('ArrowUp')
        expect($app.datePickerState.datePickerDate.value).toBe('2020-12-18')
      })

      await waitFor(() => {
        navigateWithKey('ArrowDown')
        expect($app.datePickerState.datePickerDate.value).toBe('2020-12-25')
      })

      const focusedElement = getFocusedElement()
      focusedElement?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      )
      expect($app.datePickerState.selectedDate.value).toBe('2020-12-25')
    })
  })
})
