import { MonthAgendaWeek as MonthAgendaWeekType } from '../types/month-agenda'
import MonthAgendaDay from './month-agenda-day'

type props = {
  week: MonthAgendaWeekType
  setActiveDate: (dateString: string) => void
  activeDate: string
}

export default function MonthAgendaWeek({
  week,
  setActiveDate,
  activeDate,
}: props) {
  return (
    <div className="sx__month-agenda-week">
      {week.map((day, index) => (
        <MonthAgendaDay
          setActiveDate={setActiveDate}
          day={day}
          isActive={activeDate === day.date}
          key={index + day.date}
        />
      ))}
    </div>
  )
}
