import { WeekWithDates } from '../../../../shared/types/time'
import { DATE_PICKER_WEEK } from '../constants/test-ids'
import { useContext } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { toDateString } from '../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { isToday } from '../../../../shared/utils/stateless/time/comparison'

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

  return (
    <>
      <div data-testid={DATE_PICKER_WEEK} class="sx__date-picker__week">
        {weekDays.map((weekDay) => (
          <button
            disabled={!isDateSelectable(weekDay.day)}
            class={weekDay.classes.join(' ')}
            onClick={() => selectDate(weekDay.day)}
          >
            {weekDay.day.getDate()}
          </button>
        ))}
      </div>
    </>
  )
}
