import { render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import AppPopup from '../../app-popup'
import { Placement } from '../../../enums/placement.enum'

export const factory = (placement?: Placement) => {
  const { container } = render(
    <AppContext.Provider
      value={__createDatePickerAppSingleton__(
        undefined,
        'en-US',
        undefined,
        undefined,
        placement
      )}
    >
      <AppPopup />
    </AppContext.Provider>
  )

  return container
}
