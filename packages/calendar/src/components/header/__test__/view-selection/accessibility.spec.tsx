import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { renderComponent } from './utils'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import {
  getFirstViewOption,
  getSecondViewOption,
  getThirdViewOption,
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

      let viewOption1: HTMLElement | null = getFirstViewOption()
      let viewOption2: HTMLElement | null = getSecondViewOption()
      let viewOption3: HTMLElement | null = getThirdViewOption()
      vi.runAllTimers()
      await waitFor(() => {
        viewOption1 = getFirstViewOption()
        viewOption2 = getSecondViewOption()
        viewOption3 = getThirdViewOption()
        expect(viewOption1).toBeTruthy()
      })
      ;(viewOption1 as HTMLElement).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      )
      ;(viewOption2 as HTMLElement).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      )
      ;(viewOption3 as HTMLElement).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      )

      await waitFor(() => {
        expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      })
    })
  })
})
