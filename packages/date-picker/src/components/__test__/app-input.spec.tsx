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

import AppInput from '../app-input'
import { AppContext } from '../../utils/stateful/app-context'
import DatePickerAppSingleton from '../../utils/stateful/app-singleton/date-picker-app.singleton'
import { __createDatePickerAppSingleton__ } from '../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'

describe('date picker input', () => {
  let $app: DatePickerAppSingleton | undefined

  beforeEach(() => {
    $app = __createDatePickerAppSingleton__()
  })

  afterEach(() => {
    clearAllMocks()
  })

  it('should toggle date-picker open status when clicking input', async () => {
    render(
      <AppContext.Provider value={$app as DatePickerAppSingleton}>
        <AppInput />
      </AppContext.Provider>
    )
    const datePickerIsOpenToggleSpy = spyOn(
      ($app as DatePickerAppSingleton).datePickerState,
      'toggle'
    )

    fireEvent.click(screen.getByTestId('date-picker-input'))

    await waitFor(() => {
      expect(datePickerIsOpenToggleSpy).toHaveBeenCalled()
    })
  })
})
