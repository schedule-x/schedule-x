import { MonthAgendaWeek } from '../types/month-agenda'
import { getOneLetterOrShortDayNames } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { useContext } from 'preact/compat'
import { AppContext } from '../../../utils/stateful/app-context'

type props = {
  week: MonthAgendaWeek
}

export default function MonthAgendaDayNames({ week }: props) {
  const $app = useContext(AppContext)
  const localizedShortDayNames = getOneLetterOrShortDayNames(
    week.map((day) => toJSDate(day.date)),
    $app.config.locale
  )

  return (
    <div className="sx__month-agenda-day-names">
      {localizedShortDayNames.map((oneLetterDayName) => (
        <div className="sx__month-agenda-day-name">{oneLetterDayName}</div>
      ))}
    </div>
  )
}
