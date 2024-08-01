import { cleanup, screen, waitFor } from '@testing-library/preact'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { renderComponent } from './utils'
import {
  isDropdownOpen,
  openViewSelection,
} from '../../../../utils/stateless/testing/page-objects/view-selection'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { afterEach } from 'vitest'

describe('ViewSelection', () => {
  afterEach(() => {
    cleanup()
  })

  it('should close on click outside', async () => {
    renderComponent()
    expect(isDropdownOpen()).toBe(false)

    openViewSelection()
    await waitFor(() => {
      expect(isDropdownOpen()).toBe(true)
    })

    document.body.click()

    await waitFor(() => {
      expect(isDropdownOpen()).toBe(false)
    })
  })

  it('should close on selecting a new view', async () => {
    renderComponent()
    expect(isDropdownOpen()).toBe(false)

    openViewSelection()
    await waitFor(() => {
      expect(isDropdownOpen()).toBe(true)
    })

    screen.getByText('Day').click()

    await waitFor(() => {
      expect(isDropdownOpen()).toBe(false)
    })
  })

  it('should select the day view', async () => {
    renderComponent()
    expect(screen.queryByText('Week')).toBeTruthy()
    expect(screen.queryByText('Day')).toBeFalsy()

    openViewSelection()

    await waitFor(() => {
      screen.getByText('Day').click() // select day view
    })

    await waitFor(() => {
      const selectedViewElement = document.querySelector(
        '.sx__view-selection-selected-item'
      )
      expect(selectedViewElement?.textContent).toBe('Day')
    })
  })

  it('should only display views compatible with a small calendar', async () => {
    const { $app } = renderComponent()
    $app.calendarState.setView(InternalViewName.MonthAgenda, '2023-09-13')
    $app.calendarState.isCalendarSmall.value = true

    openViewSelection()

    await waitFor(() => {
      const selectionItems = document.querySelectorAll(
        '.sx__view-selection-item'
      )
      expect(selectionItems.length).toBe(2)
      expect(selectionItems[0].textContent).toBe('Day')
      expect(selectionItems[1].textContent).toBe('Month')
    })
  })

  it('should only display views compatible with a large calendar', async () => {
    const { $app } = renderComponent()
    $app.calendarState.setView(InternalViewName.MonthAgenda, '2023-09-13')
    $app.calendarState.isCalendarSmall.value = false

    openViewSelection()

    await waitFor(() => {
      const selectionItems = document.querySelectorAll(
        '.sx__view-selection-item'
      )
      expect(selectionItems.length).toBe(3)
      expect(selectionItems[0].textContent).toBe('Day')
      expect(selectionItems[1].textContent).toBe('Week')
      expect(selectionItems[2].textContent).toBe('Month')
    })
  })
})
