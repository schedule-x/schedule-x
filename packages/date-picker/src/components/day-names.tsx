import { useContext } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import {
  getDayNamesShort,
  getOneLetterDayNames
} from '../../../../shared/utils/stateless/time/date-time-localization/date-time-localization'
import { toJSDate } from '../../../../shared/utils/stateless/time/format-conversion/format-conversion'

export default function DayNames() {
  const $app = useContext(AppContext)
  const aWeek = $app.timeUnitsImpl.getWeekFor(
    toJSDate($app.datePickerState.datePickerDate.value)
  )
  let dayNames: string[] = []
  if (['zh-cn'].includes($app.config.locale.toLowerCase())) {
    dayNames = getDayNamesShort(aWeek, $app.config.locale)
  } else {
    dayNames = getOneLetterDayNames(aWeek, $app.config.locale)
  }

  return (
    <div class="sx__date-picker__day-names">
      {dayNames.map((dayName) => (
        <span data-testid="day-name" class="sx__date-picker__day-name">
          {dayName}
        </span>
      ))}
    </div>
  )
}
