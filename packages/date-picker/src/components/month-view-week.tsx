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
import { addDays } from '@schedule-x/shared'

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
    const isDown = event.key === 'ArrowDown'
    const isUp = event.key === 'ArrowUp'
    const isLeft = event.key === 'ArrowLeft'
    const isRight = event.key === 'ArrowRight'
    if (isDown) {
      $app.datePickerState.datePickerDate.value = addDays(
        $app.datePickerState.datePickerDate.value,
        7
      )
    }

    if (isUp) {
      $app.datePickerState.datePickerDate.value = addDays(
        $app.datePickerState.datePickerDate.value,
        -7
      )
    }

    if (isLeft) {
      $app.datePickerState.datePickerDate.value = addDays(
        $app.datePickerState.datePickerDate.value,
        -1
      )
    }

    if (isRight) {
      console.log('isRight')
      $app.datePickerState.datePickerDate.value = addDays(
        $app.datePickerState.datePickerDate.value,
        1
      )
      // focus next element
      const element = document.querySelector('[data-focus="true"]')
      if (element) {
        console.log('focus button')
        ;(element as HTMLButtonElement).focus()
      }
    }
  }

  return (
    <>
      <div data-testid={DATE_PICKER_WEEK} className="sx__date-picker__week">
        {weekDays.map((weekDay) => (
          <button
            tabIndex={hasFocus(weekDay) ? 0 : -1}
            disabled={!isDateSelectable(weekDay.day)}
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
