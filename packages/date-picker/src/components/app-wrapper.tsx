import DatePickerAppSingleton from '../utils/stateful/app-singleton/date-picker-app.singleton'
import { AppContext } from '../utils/stateful/app-context'
import AppInput from './app-input'
import AppPopup from './app-popup'

type props = {
  $app: DatePickerAppSingleton
}

export default function AppWrapper({ $app }: props) {
  const classes = ['sx__date-picker-wrapper']
  if ($app.config.style?.dark) classes.push('is-dark')
  if ($app.config.style?.fullWidth) classes.push('has-full-width')

  return (
    <>
      <div class={classes.join(' ')}>
        <AppContext.Provider value={$app}>
          <AppInput />

          {$app.datePickerState.isOpen.value && <AppPopup />}
        </AppContext.Provider>
      </div>
    </>
  )
}
