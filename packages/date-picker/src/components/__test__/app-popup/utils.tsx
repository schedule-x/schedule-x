import { render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import AppPopup from '../../app-popup'

export const factory = () => {
  const { container } = render(
    <AppContext.Provider
      value={__createDatePickerAppSingleton__(undefined, 'en-US')}
    >
      <AppPopup />
    </AppContext.Provider>
  )

  return container
}
