import { MonthAgendaDay as MonthAgendaDayType } from '../types/month-agenda'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { StateUpdater, useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { getLocaleStringMonthArgs } from '../../../utils/stateless/range-heading'

type props = {
  day: MonthAgendaDayType
  isActive: boolean
  setActiveDate: StateUpdater<string>
}

export default function MonthAgendaDay({
  day,
  isActive,
  setActiveDate,
}: props) {
  const $app = useContext(AppContext)

  const monthSelected = toJSDate(
    $app.datePickerState.selectedDate.value
  ).toLocaleString(...getLocaleStringMonthArgs($app, 'numeric'))

  const currentMonth = toJSDate(day.date).getMonth()
  const isDateOfPreviousMonth = Number(monthSelected) - 1 < currentMonth
  const isDateOfNextMonth = Number(monthSelected) - 1 > currentMonth
  const dayClasses = ['sx__month-agenda-day']
  if (isActive) dayClasses.push('sx__month-agenda-day--active')
  if (isDateOfPreviousMonth) dayClasses.push('sx__is-leading-date')
  if (isDateOfNextMonth) dayClasses.push('sx__is-trailing-date')

  return (
    <div
      className={dayClasses.join(' ')}
      onClick={() => setActiveDate(day.date)}
    >
      <div>{toJSDate(day.date).getDate()}</div>

      <div className="sx__month-agenda-day__event-icons">
        {day.events.slice(0, 3).map((event) => (
          <div
            style={{
              backgroundColor: `var(--sx-color-${event._color})`,
              filter: `brightness(1.6)`,
            }}
            className="sx__month-agenda-day__event-icon"
          />
        ))}
      </div>
    </div>
  )
}
