import {
  describe,
  it,
  expect,
  afterEach,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, screen } from '@testing-library/preact'
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
})
