import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  clearAllMocks,
  spyOn,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, fireEvent, screen, waitFor } from '@testing-library/preact'

import DatePickerInput from '../date-picker-input'
import { AppContext } from '../../utils/stateful/app-context'
import DatePickerSingleton from '../../interfaces/app-singleton.interface'
import DatePickerStateBuilder from '../../../../../shared/utils/stateful/date-picker-state/date-picker-state.builder'
import createStore from '../../../../../shared/utils/stateful/store/createStore'
import { StoreModuleName } from '../../../../../shared/enums/store-module-name.enum'
import TimeUnitsBuilder from '../../../../../shared/utils/stateful/time-units/time-units.builder'

describe('date picker input', () => {
  let $app: DatePickerSingleton | undefined

  beforeEach(() => {
    $app = {
      datePickerState: createStore(
        new DatePickerStateBuilder().build(),
        StoreModuleName.DATE_PICKER_STATE
      ),
      timeUnitsImpl: new TimeUnitsBuilder().build(),
    }
  })

  afterEach(() => {
    clearAllMocks()
  })

  it('should toggle date-picker open status when clicking input', async () => {
    const { container } = render(
      <AppContext.Provider value={$app!}>
        <DatePickerInput />
      </AppContext.Provider>
    )
    const datePickerIsOpenToggleSpy = spyOn($app?.datePickerState!, 'toggle')

    fireEvent.click(screen.getByTestId('date-picker-input'))

    await waitFor(() => {
      expect(datePickerIsOpenToggleSpy).toHaveBeenCalled()
    })
  })
})
