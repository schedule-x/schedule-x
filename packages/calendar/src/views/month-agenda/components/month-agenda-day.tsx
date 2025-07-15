import { MonthAgendaDay as MonthAgendaDayType } from '../types/month-agenda'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { addDays } from '@schedule-x/shared/src'
import { getClassNameForWeekday } from '../../../utils/stateless/get-class-name-for-weekday'
import { Temporal } from 'temporal-polyfill'

type props = {
  day: MonthAgendaDayType
  isActive: boolean
  setActiveDate: (date: Temporal.PlainDate) => void
}

export default function MonthAgendaDay({
  day,
  isActive,
  setActiveDate,
}: props) {
  const $app = useContext(AppContext)
  const monthSelected = $app.datePickerState.selectedDate.value.month
  const monthOfDay = day.date.month
  const dayClasses = [
    'sx__month-agenda-day',
    getClassNameForWeekday(day.date.dayOfWeek),
  ]
  if (isActive) dayClasses.push('sx__month-agenda-day--active')
  if (monthOfDay !== monthSelected) dayClasses.push('is-leading-or-trailing')

  const handleClick = (
    e: MouseEvent,
    callback: ((dateTime: string, e?: UIEvent) => void) | undefined
  ) => {
    setActiveDate(day.date)

    if (!callback) return

    callback(day.date.toString(), e)
  }

  const hasFocus = (weekDay: MonthAgendaDayType) =>
    weekDay.date.toString() === $app.datePickerState.selectedDate.value.toString()

  const handleKeyDown = (event: KeyboardEvent) => {
    const keyMapDaysToAdd = new Map([
      ['ArrowDown', 7],
      ['ArrowUp', -7],
      ['ArrowLeft', -1],
      ['ArrowRight', 1],
    ])
    $app.datePickerState.selectedDate.value = Temporal.PlainDate.from(
      addDays(
        $app.datePickerState.selectedDate.value,
        keyMapDaysToAdd.get(event.key) || 0
      )
    )
  }

  const isBeforeMinDate = !!(
    $app.config.minDate.value && day.date.toString() < $app.config.minDate.value.toString()
  )
  const isPastMaxDate = !!(
    $app.config.maxDate.value && day.date.toString() > $app.config.maxDate.value.toString()
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
      <div>{day.date.day}</div>

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
