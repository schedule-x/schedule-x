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
