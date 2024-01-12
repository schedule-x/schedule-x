import { WeekWithDates } from '@schedule-x/shared/src/types/time'
import { DATE_PICKER_WEEK } from '../constants/test-ids'
import { useContext } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import {
  isSameMonth,
  isToday,
} from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { addDays } from '@schedule-x/shared/src'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'

type props = {
  week: WeekWithDates
}

export default function MonthViewWeek({ week }: props) {
  const $app = useContext(AppContext)

  type WeekDay = {
    day: Date
    classes: string[]
  }

  const weekDays: WeekDay[] = week.map((day) => {
    const classes = ['sx__date-picker__day']
    if (isToday(day)) classes.push('sx__date-picker__day--today')
    if (toDateString(day) === $app.datePickerState.selectedDate.value)
      classes.push('sx__date-picker__day--selected')
    if (!isSameMonth(day, toJSDate($app.datePickerState.datePickerDate.value)))
      classes.push('is-leading-or-trailing')

    return {
      day,
      classes,
    }
  })

  const isDateSelectable = (date: Date) => {
    const dateString = toDateString(date)

    return dateString >= $app.config.min && dateString <= $app.config.max
  }

  const selectDate = (date: Date) => {
    $app.datePickerState.selectedDate.value = toDateString(date)
    $app.datePickerState.close()
  }

  const hasFocus = (weekDay: WeekDay) =>
    toDateString(weekDay.day) === $app.datePickerState.datePickerDate.value

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      $app.datePickerState.selectedDate.value =
        $app.datePickerState.datePickerDate.value
      $app.datePickerState.close()
      return
    }

    const keyMapDaysToAdd = new Map([
      ['ArrowDown', 7],
      ['ArrowUp', -7],
      ['ArrowLeft', -1],
      ['ArrowRight', 1],
    ])
    $app.datePickerState.datePickerDate.value = addDays(
      $app.datePickerState.datePickerDate.value,
      keyMapDaysToAdd.get(event.key) || 0
    )
  }

  return (
    <>
      <div data-testid={DATE_PICKER_WEEK} className="sx__date-picker__week">
        {weekDays.map((weekDay) => (
          <button
            tabIndex={hasFocus(weekDay) ? 0 : -1}
            disabled={!isDateSelectable(weekDay.day)}
            aria-label={getLocalizedDate(
              $app.datePickerState.datePickerDate.value,
              $app.config.locale
            )}
            className={weekDay.classes.join(' ')}
            data-focus={hasFocus(weekDay) ? 'true' : undefined}
            onClick={() => selectDate(weekDay.day)}
            onKeyDown={handleKeyDown}
          >
            {weekDay.day.getDate()}
          </button>
        ))}
      </div>
    </>
  )
}
