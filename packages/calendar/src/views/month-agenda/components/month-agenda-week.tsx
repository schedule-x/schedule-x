import { MonthAgendaWeek as MonthAgendaWeekType } from '../types/month-agenda'
import MonthAgendaDay from './month-agenda-day'
import { StateUpdater } from 'preact/compat'

type props = {
  week: MonthAgendaWeekType
  setActiveDate: StateUpdater<string>
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
