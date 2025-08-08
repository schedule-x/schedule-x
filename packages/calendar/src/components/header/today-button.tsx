import { AppContext } from '../../utils/stateful/app-context'
import { useContext } from 'preact/hooks'

export default function TodayButton() {
  const $app = useContext(AppContext)

  const setToday = () => {
    $app.datePickerState.selectedDate.value = Temporal.PlainDate.from(
      Temporal.Now.plainDateISO()
    )
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
