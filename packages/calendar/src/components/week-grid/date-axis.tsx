import { WeekWithDates } from '@schedule-x/shared/src/types/time'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { isToday } from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { getClassNameForWeekday } from '../../utils/stateless/get-class-name-for-weekday'
import { toDateString } from '@schedule-x/shared/src'

type props = {
  week: WeekWithDates
}

export default function DateAxis({ week }: props) {
  const $app = useContext(AppContext)

  const getClassNames = (date: Date) => {
    const classNames = [
      'sx__week-grid__date',
      getClassNameForWeekday(date.getDay()),
    ]
    if (isToday(date)) {
      classNames.push('sx__week-grid__date--is-today')
    }

    return classNames.join(' ')
  }

  return (
    <>
      <div className="sx__week-grid__date-axis">
        {week.map((date) => (
          <div className={getClassNames(date)} data-date={toDateString(date)}>
            <div className="sx__week-grid__day-name">
              {getDayNameShort(date, $app.config.locale.value)}
            </div>

            <div className="sx__week-grid__date-number">{date.getDate()}</div>
          </div>
        ))}
      </div>
    </>
  )
}
