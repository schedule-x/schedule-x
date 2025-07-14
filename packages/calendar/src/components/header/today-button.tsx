import { AppContext } from '../../utils/stateful/app-context'
import { useContext } from 'preact/hooks'
import { Temporal } from 'temporal-polyfill'

export default function TodayButton() {
  const $app = useContext(AppContext)

  const setToday = () => {
    $app.datePickerState.selectedDate.value = Temporal.Now.zonedDateTimeISO()
  }

  return (
    <button
      type="button"
      className={'sx__today-button sx__ripple'}
      onClick={setToday}
    >
      {$app.translate('Today')}
    </button>
  )
}
