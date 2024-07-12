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
      {week.map((day) => (
        <MonthGridDay
          day={day}
          isFirstWeek={isFirstWeek}
          isLastWeek={isLastWeek}
        />
      ))}
    </div>
  )
}
