import { cleanup, screen, waitFor } from '@testing-library/preact'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { factory, queryDropdown } from './utils'

describe('ViewSelection', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should close on click outside', async () => {
    factory()
    expect(queryDropdown()).toBeNull()

    screen.getByText('Week').click()
    await waitFor(() => {
      expect(queryDropdown()).not.toBeNull()
    })

    document.body.click()

    await waitFor(() => {
      expect(queryDropdown()).toBeNull()
    })
  })

  it('should close on selecting a new view', async () => {
    factory()
    expect(queryDropdown()).toBeNull()

    screen.getByText('Week').click()
    await waitFor(() => {
      expect(queryDropdown()).not.toBeNull()
    })

    screen.getByText('Day').click()

    await waitFor(() => {
      expect(queryDropdown()).toBeNull()
    })
  })

  it('should select the day view', async () => {
    factory()
    expect(screen.queryByText('Week')).toBeTruthy()
    expect(screen.queryByText('Day')).toBeFalsy()

    screen.getByText('Week').click() // open dropdown

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
