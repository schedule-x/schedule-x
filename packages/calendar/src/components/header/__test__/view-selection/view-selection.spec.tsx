import { cleanup, screen, waitFor } from '@testing-library/preact'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { factory } from './utils'
import {
  isDropdownOpen,
  openViewSelection,
} from '../../../../utils/stateless/testing/page-objects/view-selection'

describe('ViewSelection', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should close on click outside', async () => {
    factory()
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
    factory()
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
    factory()
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
})
