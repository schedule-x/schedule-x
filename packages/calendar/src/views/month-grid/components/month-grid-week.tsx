import { MonthWeek as MonthWeekType } from '../types/month'
import MonthGridDay from './month-grid-day'

type props = {
  week: MonthWeekType
  isFirstWeek: boolean
  isLastWeek: boolean
}

export default function MonthGridWeek({
  week,
  isFirstWeek,
  isLastWeek,
}: props) {
  return (
    <div className="sx__month-grid-week">
      {week.map((day) => {
        /**
         * The day component keeps internal state, and needs to be thrown away once the day changes.
         * */
        const dateKey = day.date
        return (
          <MonthGridDay
            key={dateKey}
            day={day}
            isFirstWeek={isFirstWeek}
            isLastWeek={isLastWeek}
          />
        )
      })}
    </div>
  )
}
