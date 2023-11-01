import { MonthAgendaDay as MonthAgendaDayType } from '../types/month-agenda'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { StateUpdater } from 'preact/compat'

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
  const dayClasses = ['sx__month-agenda-day']
  if (isActive) dayClasses.push('sx__month-agenda-day--active')

  return (
    <div
      className={dayClasses.join(' ')}
      onClick={() => setActiveDate(day.date)}
    >
      {toJSDate(day.date).getDate()}
    </div>
  )
}
