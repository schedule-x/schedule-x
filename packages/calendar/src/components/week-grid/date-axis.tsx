import { WeekWithDates } from '../../../../../shared/types/time'
import { getDayNameShort } from '../../../../../shared/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { isToday } from '../../../../../shared/utils/stateless/time/comparison'

type props = {
  week: WeekWithDates
}

export default function DateAxis({ week }: props) {
  const $app = useContext(AppContext)

  const getClassNames = (date: Date) => {
    const classNames = ['sx__week-grid__date']
    if (isToday(date)) {
      classNames.push('sx__week-grid__date--is-today')
    }

    return classNames.join(' ')
  }

  return (
    <>
      <div className="sx__week-grid__date-axis">
        {week.map((date) => (
          <div className={getClassNames(date)}>
            <div className="sx__week-grid__day-name">
              {getDayNameShort(date, $app.config.locale)}
            </div>

            <div className="sx__week-grid__date-number">{date.getDate()}</div>
          </div>
        ))}
      </div>
    </>
  )
}
