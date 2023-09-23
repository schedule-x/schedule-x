import { AppContext } from '../../utils/stateful/app-context'
import { useContext } from 'preact/compat'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

export default function TodayButton() {
  const $app = useContext(AppContext)

  const setToday = () => {
    $app.datePickerState.selectedDate.value = toDateString(new Date())
  }

  return (
    <button className={'sx__today-button sx__ripple'} onClick={setToday}>
      {$app.translate('Today')}
    </button>
  )
}
