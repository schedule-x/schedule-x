import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { MONTH_VIEW } from '../../../constants/test-ids'
import { factory } from './utils'

describe('AppPopup', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render month view as default view', () => {
    factory()
    expect(screen.queryByTestId(MONTH_VIEW)).not.toBeNull()
  })

  it('should display years view', async () => {
    const container = factory()
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
    const container = factory()
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
})
