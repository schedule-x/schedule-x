import { MonthWeek as MonthWeekType } from '../types/month'
import MonthGridDay from './month-grid-day'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { getWeekNumber } from '../../../utils/stateless/time/get-week-number'
import { toDateString } from '@schedule-x/shared/src'

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
  const $app = useContext(AppContext)

  return (
    <div className="sx__month-grid-week">
      {$app.config.showWeekNumbers.value && (
        <div className="sx__month-grid-week__week-number">
          {getWeekNumber(week[0].date, $app.config.firstDayOfWeek.value)}
        </div>
      )}

      {week.map((day) => {
        /**
         * The day component keeps internal state, and needs to be thrown away once the day changes.
         * */
        return (
          <MonthGridDay
            key={toDateString(day.date)}
            day={day}
            isFirstWeek={isFirstWeek}
            isLastWeek={isLastWeek}
          />
        )
      })}
    </div>
  )
}
