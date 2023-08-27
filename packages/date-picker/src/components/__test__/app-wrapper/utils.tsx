import { expect } from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, screen, waitFor } from '@testing-library/preact'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import AppWrapper from '../../app-wrapper'

export const DATE_PICKER_POPUP_TEST_ID = 'date-picker-popup'

export const assertIsShowingPopup = async () => {
  await waitFor(() => {
    expect(screen.queryByTestId(DATE_PICKER_POPUP_TEST_ID)).not.toBeNull()
  })
}

export const assertIsNotShowingPopup = async () => {
  await waitFor(() => {
    expect(screen.queryByTestId(DATE_PICKER_POPUP_TEST_ID)).toBeNull()
  })
}

export const renderWithOpenPopup = (
  $app: DatePickerAppSingleton | undefined
) => {
  ;($app as DatePickerAppSingleton).datePickerState.open()
  render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
}

export const getAppWrapper = () => {
  return document.querySelector('.sx__date-picker-wrapper') as HTMLElement
}
