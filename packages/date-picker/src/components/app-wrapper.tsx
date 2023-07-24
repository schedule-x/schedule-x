import DatePickerAppSingleton from '../utils/stateful/app-singleton/date-picker-app.singleton'
import { AppContext } from '../utils/stateful/app-context'
import AppInput from './app-input'
import AppPopup from './app-popup'

type props = {
  $app: DatePickerAppSingleton
}

export default function AppWrapper({ $app }: props) {
  return (
    <>
      <div class="sx__date-picker-wrapper">
        <AppContext.Provider value={$app}>
          <AppInput />

          {$app.datePickerState.isOpen.value && <AppPopup />}
        </AppContext.Provider>
      </div>
    </>
  )
}
