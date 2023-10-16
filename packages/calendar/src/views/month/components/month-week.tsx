import { MonthWeek as MonthWeekType } from '../types/month'
import MonthDay from './month-day'

type props = {
  week: MonthWeekType
  isFirstWeek: boolean
}

export default function MonthWeek({ week, isFirstWeek }: props) {
  return (
    <div className="sx__month-week">
      {Object.values(week).map((day) => (
        <MonthDay day={day} isFirstWeek={isFirstWeek} />
      ))}
    </div>
  )
}
