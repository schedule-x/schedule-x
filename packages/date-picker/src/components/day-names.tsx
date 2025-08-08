import { useContext } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { getOneLetterOrShortDayNames } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'

export default function DayNames() {
  const $app = useContext(AppContext)
  const aWeek = $app.timeUnitsImpl.getWeekFor(
    $app.datePickerState.datePickerDate.value
  )

  const dayNames = getOneLetterOrShortDayNames(aWeek, $app.config.locale.value)

  return (
    <div className="sx__date-picker__day-names">
      {dayNames.map((dayName) => (
        <span data-testid="day-name" className="sx__date-picker__day-name">
          {dayName}
        </span>
      ))}
    </div>
  )
}
