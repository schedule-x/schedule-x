import {
  describe,
  it,
  expect,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, screen, waitFor } from '@testing-library/preact'
import AppPopup from '../app-popup'
import { MONTH_VIEW } from '../../constants/test-ids'
import { __createDatePickerAppSingleton__ } from '../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { AppContext } from '../../utils/stateful/app-context'

describe('AppPopup', () => {
  const $app = __createDatePickerAppSingleton__()

  it('should render month view as default view', () => {
    render(
      <AppContext.Provider value={$app}>
        <AppPopup />
      </AppContext.Provider>
    )

    expect(screen.queryByTestId(MONTH_VIEW)).not.toBeNull()
  })

  it('should display years view', async () => {
    const { container } = render(
      <AppContext.Provider value={$app}>
        <AppPopup />
      </AppContext.Provider>
    )

    const monthYear = container.querySelector(
      '.sx__date-picker__month-view-header__month-year'
    )
    if (!monthYear) throw new Error('monthYear is null')
    monthYear.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const yearsView = await screen.findByTestId('years-view')

    await waitFor(() => {
      expect(yearsView).not.toBeNull()
    })
  })
})
