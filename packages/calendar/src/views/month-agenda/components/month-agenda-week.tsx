import { AgendaWeek } from '../types/month-agenda'
import MonthAgendaDay from './month-agenda-day'
import { getWeekNumber } from '../../../utils/stateless/time/get-week-number'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'

import { isSameDay } from '@schedule-x/shared/src/utils/stateless/time/comparison'

type props = {
  week: AgendaWeek
  setActiveDate: (date: Temporal.PlainDate) => void
  activeDate: Temporal.PlainDate
  isLeadingOrTrailing?: (date: Temporal.PlainDate) => boolean
}

export default function MonthAgendaWeek({
  week,
  setActiveDate,
  activeDate,
  isLeadingOrTrailing,
}: props) {
  const $app = useContext(AppContext)

  return (
    <div className="sx__month-agenda-week">
      {$app.config.showWeekNumbers.value && (
        <div className="sx__month-agenda-week__week-number">
          {getWeekNumber(
            Temporal.PlainDate.from(week[0].date),
            $app.config.firstDayOfWeek.value
          )}
        </div>
      )}

      {week.map((day, index) => (
        <MonthAgendaDay
          setActiveDate={setActiveDate}
          day={day}
          isActive={isSameDay(activeDate, day.date)}
          isLeadingOrTrailing={isLeadingOrTrailing?.(day.date)}
          key={index + day.date.toString()}
        />
      ))}
    </div>
  )
}
