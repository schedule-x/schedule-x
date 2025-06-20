import { MonthAgendaDay as MonthAgendaDayType } from '../types/month-agenda'
import {
  toIntegers,
  toJSDate,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { addDays } from '@schedule-x/shared/src'
import { getClassNameForWeekday } from '../../../utils/stateless/get-class-name-for-weekday'

type props = {
  day: MonthAgendaDayType
  isActive: boolean
  setActiveDate: (dateString: string) => void
}

export default function MonthAgendaDay({
  day,
  isActive,
  setActiveDate,
}: props) {
  const $app = useContext(AppContext)

  const { month: monthSelected } = toIntegers(
    $app.datePickerState.selectedDate.value
  )

  const { month: monthOfDay } = toIntegers(day.date)
  const jsDate = toJSDate(day.date)
  const dayClasses = [
    'sx__month-agenda-day',
    getClassNameForWeekday(jsDate.getDay()),
  ]
  if (isActive) dayClasses.push('sx__month-agenda-day--active')
  if (monthOfDay !== monthSelected) dayClasses.push('is-leading-or-trailing')

  const handleClick = (
    e: MouseEvent,
    callback: ((dateTime: string, e?: UIEvent) => void) | undefined
  ) => {
    setActiveDate(day.date)

    if (!callback) return

    callback(day.date, e)
  }

  const hasFocus = (weekDay: MonthAgendaDayType) =>
    weekDay.date === $app.datePickerState.selectedDate.value

  const handleKeyDown = (event: KeyboardEvent) => {
    const keyMapDaysToAdd = new Map([
      ['ArrowDown', 7],
      ['ArrowUp', -7],
      ['ArrowLeft', -1],
      ['ArrowRight', 1],
    ])
    $app.datePickerState.selectedDate.value = addDays(
      $app.datePickerState.selectedDate.value,
      keyMapDaysToAdd.get(event.key) || 0
    )
  }

  const isBeforeMinDate = !!(
    $app.config.minDate.value && day.date < $app.config.minDate.value
  )
  const isPastMaxDate = !!(
    $app.config.maxDate.value && day.date > $app.config.maxDate.value
  )
  return (
    <button
      type="button"
      className={dayClasses.join(' ')}
      onClick={(e) => handleClick(e, $app.config.callbacks.onClickAgendaDate)}
      onDblClick={(e) =>
        handleClick(e, $app.config.callbacks.onDoubleClickAgendaDate)
      }
      disabled={isBeforeMinDate || isPastMaxDate}
      aria-label={getLocalizedDate(day.date, $app.config.locale.value)}
      tabIndex={hasFocus(day) ? 0 : -1}
      data-agenda-focus={hasFocus(day) ? 'true' : undefined}
      onKeyDown={handleKeyDown}
    >
      <div>{jsDate.getDate()}</div>

      <div className="sx__month-agenda-day__event-icons">
        {day.events.slice(0, 3).map((event) => (
          <div
            style={{ backgroundColor: `var(--sx-color-${event._color})` }}
            className="sx__month-agenda-day__event-icon"
          />
        ))}
      </div>
    </button>
  )
}
