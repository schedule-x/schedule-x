import { MonthAgendaDay as MonthAgendaDayType } from '../types/month-agenda'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { SetStateAction } from 'preact/compat'

type props = {
  day: MonthAgendaDayType
  isActive: boolean
  setActiveDate: SetStateAction<string>
}

export default function MonthAgendaDay({
  day,
  isActive,
  setActiveDate,
}: props) {
  const dayClasses = ['sx__month-agenda-day']
  if (isActive) dayClasses.push('sx__month-agenda-day--active')

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
