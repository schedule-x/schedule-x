import { WeekWithDates } from '@schedule-x/shared/src/types/time'
import { DATE_PICKER_WEEK } from '../constants/test-ids'
import { useContext } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import {
  isSameMonth,
  isToday,
} from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { addDays } from '@schedule-x/shared/src'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { isSameDay } from '@schedule-x/shared/src/utils/stateless/time/comparison'

type props = {
  week: WeekWithDates
}

export default function MonthViewWeek({ week }: props) {
  const $app = useContext(AppContext)

  type WeekDay = {
    day: Temporal.PlainDate
    classes: string[]
  }

  const weekDays: WeekDay[] = week.map((day) => {
    const classes = ['sx__date-picker__day']
    if (isToday(day, $app.config.timezone.value))
      classes.push('sx__date-picker__day--today')
    if (isSameDay(day, $app.datePickerState.selectedDate.value))
      classes.push('sx__date-picker__day--selected')
    if (!isSameMonth(day, $app.datePickerState.datePickerDate.value))
      classes.push('is-leading-or-trailing')

    return {
      day: day.toPlainDate(),
      classes,
    }
  })

  const isDateSelectable = (date: Temporal.PlainDate) => {
    return (
      date.toString() >= $app.config.min.toString() &&
      date.toString() <= $app.config.max.toString()
    )
  }

  const selectDate = (date: Temporal.PlainDate) => {
    $app.datePickerState.selectedDate.value = date
    $app.datePickerState.close()
  }

  const hasFocus = (weekDay: WeekDay) =>
    isSameDay(weekDay.day, $app.datePickerState.datePickerDate.value)

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
    ) as Temporal.PlainDate
  }

  return (
    <>
      <div data-testid={DATE_PICKER_WEEK} className="sx__date-picker__week">
        {weekDays.map((weekDay) => (
          <button
            type="button"
            tabIndex={hasFocus(weekDay) ? 0 : -1}
            disabled={!isDateSelectable(weekDay.day)}
            aria-label={getLocalizedDate(
              $app.datePickerState.datePickerDate.value,
              $app.config.locale.value
            )}
            className={weekDay.classes.join(' ')}
            data-focus={hasFocus(weekDay) ? 'true' : undefined}
            onClick={() => selectDate(weekDay.day)}
            onKeyDown={handleKeyDown}
          >
            {weekDay.day.day}
          </button>
        ))}
      </div>
    </>
  )
}
