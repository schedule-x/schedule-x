import { render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import AppPopup from '../../app-popup'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { createAppSingleton } from '../../../factory'

export const renderComponent = (placement?: Placement) => {
  const { container } = render(
    <AppContext.Provider
      value={createAppSingleton({
        placement,
        locale: 'en-US',
      })}
    >
      <AppPopup />
    </AppContext.Provider>
  )

  return container
}
