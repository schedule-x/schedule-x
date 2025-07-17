import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { getWeekNumber } from '../../utils/stateless/time/get-week-number'
import { toJSDate } from '@schedule-x/shared/src'

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
