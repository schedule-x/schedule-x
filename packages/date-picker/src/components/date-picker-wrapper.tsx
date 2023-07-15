import DatePickerSingleton from '../interfaces/app-singleton.interface'
import DatePickerConfig from '../interfaces/config.interface'
import { AppContext } from '../utils/stateful/app-context'
import DatePickerInput from './date-picker-input'
import DatePickerPopup from './date-picker-popup'
import { useEffect, useState } from 'preact/compat'
import { StoreModuleName } from '../../../../shared/enums/store-module-name.enum'

type props = {
  $app: DatePickerSingleton
  config: DatePickerConfig
}

export default function DatePickerWrapper({ $app, config }: props) {
  const [isPopupOpen, setIsPopupOpen] = useState($app.datePickerState.isOpen)

  const handleDatePickerStateChange = ((e: CustomEvent) => {
    setIsPopupOpen(e.detail.isOpen)
  }) as EventListener

  useEffect(() => {
    const eventAndListener: [string, EventListener] = [
      StoreModuleName.DATE_PICKER_STATE,
      handleDatePickerStateChange,
    ]
    document.addEventListener(...eventAndListener)
    return () => document.removeEventListener(...eventAndListener)
  })

  return (
    <>
      <div class="sx__date-picker-wrapper">
        <AppContext.Provider value={$app}>
          <DatePickerInput />

          {isPopupOpen && <DatePickerPopup />}
        </AppContext.Provider>
      </div>
    </>
  )
}
