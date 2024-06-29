import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import { AppContext } from '../utils/stateful/app-context'
import AppInput from './app-input'
import AppPopup from './app-popup'
import { createPortal } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'

type props = {
  $app: DatePickerAppSingleton
}

export default function AppWrapper({ $app }: props) {
  const initialClassList = ['sx__date-picker-wrapper']
  const [classList, setClassList] = useState(initialClassList)

  useEffect(() => {
    setClassList([
      ...initialClassList,
      $app.datePickerState.isDark.value ? 'is-dark' : '',
      $app.config.style?.fullWidth ? 'has-full-width' : '',
    ])
  }, [$app.datePickerState.isDark.value])

  let appPopupJSX = <AppPopup />
  if ($app.config.teleportTo)
    appPopupJSX = createPortal(appPopupJSX, $app.config.teleportTo)

  return (
    <>
      <div className={classList.join(' ')}>
        <AppContext.Provider value={$app}>
          <AppInput />

          {$app.datePickerState.isOpen.value && appPopupJSX}
        </AppContext.Provider>
      </div>
    </>
  )
}
