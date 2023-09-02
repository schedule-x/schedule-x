import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import ViewSelection from '../view-selection'
import { createCalendarAppSingleton } from '../../../factory'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { viewDay, viewWeek, viewMonth } from '../../../index'

const factory = () => {
  const $app = createCalendarAppSingleton({
    views: [viewDay, viewWeek, viewMonth],
  })

  return render(
    <AppContext.Provider value={$app}>
      <ViewSelection />
    </AppContext.Provider>
  )
}

function queryDropdown() {
  return screen.queryByTestId('view-selection-items')
}

describe('ViewSelection', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should close on click outside', async () => {
    const otherElement = document.createElement('div')
    document.body.appendChild(otherElement)
    factory()
    expect(queryDropdown()).toBeNull()

    screen.getByText('Week').click()
    await waitFor(() => {
      expect(queryDropdown()).not.toBeNull()
    })

    otherElement.click()

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
