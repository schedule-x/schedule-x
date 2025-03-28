import { MonthAgendaWeek as MonthAgendaWeekType } from '../types/month-agenda'
import MonthAgendaDay from './month-agenda-day'
import { getWeekNumber } from '../../../utils/stateless/time/get-week-number'
import { toJSDate } from '@schedule-x/shared/src'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'

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
  const $app = useContext(AppContext)

  return (
    <div className="sx__month-agenda-week">
      {$app.config.showWeekNumbers.value && (
        <div className="sx__month-agenda-week__week-number">
          {getWeekNumber(
            toJSDate(week[0].date),
            $app.config.firstDayOfWeek.value
          )}
        </div>
      )}

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
