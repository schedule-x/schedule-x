import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, fireEvent, screen, waitFor } from '@testing-library/preact'
import DatePickerWrapper from '../date-picker-wrapper'
import createStore from '../../../../../shared/utils/stateful/store/createStore'
import DatePickerStateBuilder from '../../../../../shared/utils/stateful/date-picker-state/date-picker-state.builder'
import TimeUnitsBuilder from '../../../../../shared/utils/stateful/time-units/time-units.builder'
import { StoreModuleName } from '../../../../../shared/enums/store-module-name.enum'
import DatePickerSingleton from '../../interfaces/app-singleton.interface'

describe('date picker wrapper', () => {
  let $app: DatePickerSingleton | undefined

  beforeEach(() => {
    $app = {
      datePickerState: createStore(
        new DatePickerStateBuilder().build(),
        'DATE_PICKER_STATE'
      ),
      timeUnitsImpl: new TimeUnitsBuilder().build(),
    }
  })

  it('should not display popup on render', () => {
    const { container } = render(<DatePickerWrapper $app={$app!} config={{}} />)

    expect(screen.queryByTestId('date-picker-popup')).toBeNull()
  })

  it('should display popup on render', () => {
    $app!.datePickerState.open()
    const { container } = render(<DatePickerWrapper $app={$app!} config={{}} />)

    expect(screen.queryByTestId('date-picker-popup')).not.toBeNull()
  })

  it('should display popup when datePickerState changes and isOpen is true', async () => {
    const { container } = render(<DatePickerWrapper $app={$app!} config={{}} />)

    const customEvent = new CustomEvent(StoreModuleName.DATE_PICKER_STATE, {
      detail: { isOpen: true },
    })
    document.dispatchEvent(customEvent)

    await waitFor(() => {
      expect(screen.queryByTestId('date-picker-popup')).not.toBeNull()
    })
  })
})
