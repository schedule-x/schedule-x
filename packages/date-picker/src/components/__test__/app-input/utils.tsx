import { fireEvent, render, screen } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import AppInput from '../../app-input'
import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'

export const renderComponent = ($app: DatePickerAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <AppInput />
    </AppContext.Provider>
  )
}

export const getInputWrapperElement = () => {
  return document.querySelector('.sx__date-input-wrapper') as HTMLDivElement
}

export const getInputElement = () => screen.getByTestId('date-picker-input')

export const setNewDateAndPressEnter = (value: string) => {
  const inputElement = getInputElement()
  fireEvent.input(inputElement, { target: { value } })
  fireEvent.keyUp(inputElement, { key: 'Enter' })
}
