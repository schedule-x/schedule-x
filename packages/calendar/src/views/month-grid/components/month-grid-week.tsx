import { MonthWeek as MonthWeekType } from '../types/month'
import MonthGridDay from './month-grid-day'

type props = {
  week: MonthWeekType
  isFirstWeek: boolean
}

export default function MonthGridWeek({ week, isFirstWeek }: props) {
  return (
    <div className="sx__month-grid-week">
      {week.map((day) => (
        <MonthGridDay day={day} isFirstWeek={isFirstWeek} />
      ))}
    </div>
  )
}
