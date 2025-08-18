import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { renderComponent } from './utils'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import {
  getViewOptionN,
  getViewSelectionElement,
  isDropdownOpen,
} from '../../../../utils/stateless/testing/page-objects/view-selection'
import { cleanup, render, waitFor } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import CalendarWrapper from '../../../calendar-wrapper'
import { afterEach, beforeEach, vi } from 'vitest'

describe('ViewSelection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
  })

  describe('Navigating it by keyboard', () => {
    it('should open the dropdown on enter or space', async () => {
      renderComponent()
      expect(isDropdownOpen()).toBe(false)

      const selectElement = getViewSelectionElement()
      selectElement.focus()
      expect(isDropdownOpen()).toBe(false)

      selectElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      )
      await waitFor(() => {
        expect(isDropdownOpen()).toBe(true)
      })
    })

    it('should select a new view', async () => {
      const $app = __createAppWithViews__()
      render(<CalendarWrapper $app={$app} />)
      expect($app.calendarState.view.value).toBe(InternalViewName.Week)

      const selectElement = getViewSelectionElement()
      selectElement.focus()
      selectElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      )

      let viewOption1!: HTMLLIElement
      let viewOption2!: HTMLLIElement
      let viewOption3!: HTMLLIElement
      vi.runAllTimers()
      await waitFor(() => {
        viewOption1 = getViewOptionN(1)
        viewOption2 = getViewOptionN(2)
        viewOption3 = getViewOptionN(3)
        expect(viewOption1).toBeTruthy()
      })

      viewOption1.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      )
      viewOption2.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      )
      viewOption3.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

      await waitFor(() => {
        expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      })
    })
  })
})
