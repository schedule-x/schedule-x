import { TimePickerAppContext } from '../types/time-picker-app.context'
import { AppContext } from '../utils/stateful/app-context'
import AppInput from './app-input'
import AppPopup from './app-popup'
import { createPortal } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'

type props = {
  $app: TimePickerAppContext
}

export default function TimePickerWrapper({ $app }: props) {
  const baseClassList = [
    'sx__time-picker-wrapper',
    $app.config.is12Hour.value ? 'is-12-hour' : '',
  ]
  const [classList, setClassList] = useState<string[]>(baseClassList)

  useEffect(() => {
    setClassList([...baseClassList, $app.config.dark.value ? 'is-dark' : ''])
  }, [$app.config.dark.value])

  let AppPopupJSX = <AppPopup />
  if ($app.config.teleportTo.value) {
    AppPopupJSX = createPortal(AppPopupJSX, $app.config.teleportTo.value)
  }

  return (
    <>
      <div className={classList.join(' ')}>
        <AppContext.Provider value={$app}>
          <AppInput />

          {$app.timePickerState.isOpen.value && AppPopupJSX}
        </AppContext.Provider>
      </div>
    </>
  )
}
