import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import { AppContext } from '../utils/stateful/app-context'
import AppInput from './app-input'
import AppPopup from './app-popup'
import { createPortal, useRef } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'

type props = {
  $app: DatePickerAppSingleton
}

export default function AppWrapper({ $app }: props) {
  const initialClassList = ['sx__date-picker-wrapper']
  const [classList, setClassList] = useState(initialClassList)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef && elementRef.current instanceof HTMLDivElement)
      $app.elements = { DatePickerWrapper: elementRef.current }
  }, [])

  useEffect(() => {
    const list = [...initialClassList]
    if ($app.datePickerState.isDark.value) list.push('is-dark')
    if ($app.config.style?.fullWidth) list.push('has-full-width')
    if ($app.datePickerState.isDisabled.value) list.push('is-disabled')
    setClassList(list)
  }, [$app.datePickerState.isDark.value, $app.datePickerState.isDisabled.value])

  let appPopupJSX = <AppPopup wrapperEl={elementRef.current} />
  if ($app.config.teleportTo)
    appPopupJSX = createPortal(appPopupJSX, $app.config.teleportTo)

  return (
    <>
      <div ref={elementRef} className={classList.join(' ')}>
        <AppContext.Provider value={$app}>
          <AppInput />

          {$app.datePickerState.isOpen.value && appPopupJSX}
        </AppContext.Provider>
      </div>
    </>
  )
}
