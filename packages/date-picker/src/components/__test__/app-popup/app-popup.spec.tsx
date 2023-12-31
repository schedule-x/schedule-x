import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { MONTH_VIEW } from '../../../constants/test-ids'
import { renderComponent } from './utils'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'

describe('AppPopup', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render month view as default view', () => {
    renderComponent()
    expect(screen.queryByTestId(MONTH_VIEW)).not.toBeNull()
  })

  it('should display years view', async () => {
    const container = renderComponent()
    const toggleViewElement = container.querySelector(
      '.sx__date-picker__month-view-header__month-year'
    )
    if (!toggleViewElement) throw new Error('no toggle view element was found')

    toggleViewElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const yearsView = await screen.findByTestId('years-view')
    await waitFor(() => {
      expect(yearsView).not.toBeNull()
    })
  })

  it('should toggle from years to month view', async () => {
    const container = renderComponent()
    const toggleViewElement = container.querySelector(
      '.sx__date-picker__month-view-header__month-year'
    )
    if (!toggleViewElement) throw new Error('no toggle view element was found')

    toggleViewElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const yearsView = await screen.findByTestId('years-view')

    await waitFor(() => {
      expect(yearsView).not.toBeNull()
    })

    screen.getByText('January').click()

    await waitFor(() => {
      expect(screen.queryByTestId(MONTH_VIEW)).not.toBeNull()
    })
  })

  it.each([
    Placement.TOP_START,
    Placement.TOP_END,
    Placement.BOTTOM_START,
    Placement.BOTTOM_END,
  ])(
    'should render with different placement classes',
    (placement: Placement) => {
      renderComponent(placement)
      const popup = screen.getByTestId('date-picker-popup')
      expect(popup.classList.contains(placement)).toBe(true)
    }
  )
})
