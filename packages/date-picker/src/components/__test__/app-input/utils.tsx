import { render, screen } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import AppInput from '../../app-input'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'

export const factory = ($app: DatePickerAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <AppInput />
    </AppContext.Provider>
  )
}

export const getInputWrapperElement = () => {
  return document.querySelector(
    '.sx__date-input-wrapper'
  ) as HTMLDivElement
}

export const getInputElement = () => screen.getByTestId('date-picker-input')