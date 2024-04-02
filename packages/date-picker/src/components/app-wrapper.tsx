import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import { AppContext } from '../utils/stateful/app-context'
import AppInput from './app-input'
import AppPopup from './app-popup'
import { createPortal } from 'preact/compat'

type props = {
  $app: DatePickerAppSingleton
}

export default function AppWrapper({ $app }: props) {
  const classes = ['sx__date-picker-wrapper']
  if ($app.config.style?.dark) classes.push('is-dark')
  if ($app.config.style?.fullWidth) classes.push('has-full-width')

  let appPopupJSX = <AppPopup />
  if ($app.config.teleportTo)
    appPopupJSX = createPortal(appPopupJSX, $app.config.teleportTo)

  return (
    <>
      <div className={classes.join(' ')}>
        <AppContext.Provider value={$app}>
          <AppInput />

          {$app.datePickerState.isOpen.value && appPopupJSX}
        </AppContext.Provider>
      </div>
    </>
  )
}
