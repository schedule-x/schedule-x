import { MonthDay as MonthDayType } from '../types/month'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext } from 'preact/compat'
import { AppContext } from '../../../utils/stateful/app-context'

type props = {
  day: MonthDayType
  isFirstWeek: boolean
}

export default function MonthDay({ day, isFirstWeek }: props) {
  const $app = useContext(AppContext)

  return (
    <div className="sx__month-day">
      <div className="sx__month-day-header">
        {isFirstWeek ? (
          <div className="sx__month-day-header-day-name">
            {getDayNameShort(toJSDate(day.date), $app.config.locale)}
          </div>
        ) : null}

        <div className="sx__month-day-header-date">
          {toJSDate(day.date).getDate()}
        </div>
      </div>
    </div>
  )
}
