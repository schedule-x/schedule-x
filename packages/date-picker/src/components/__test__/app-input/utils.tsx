import { render } from '@testing-library/preact'
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
