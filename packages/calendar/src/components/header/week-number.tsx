import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { getWeekNumber } from '../../utils/stateless/time/get-week-number'

export default function WeekNumber() {
  const $app = useContext(AppContext)

  return (
    <div className="sx__calendar-header__week-number">
      {$app.translate('CW', {
        week: getWeekNumber(
          $app.datePickerState.selectedDate.value,
          $app.config.firstDayOfWeek.value
        ),
      })}
    </div>
  )
}
