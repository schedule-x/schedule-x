import { useContext } from 'preact/hooks'
import { AppContext } from '@schedule-x/shared/src/utils/stateful/app-context'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { isToday } from '@schedule-x/shared/src/utils/stateless/time/comparison'

type props = {
  dates: string[]
  nResources: number
}

export default function ResourceDateAxis({ dates, nResources }: props) {
  const $app = useContext(AppContext)

  const getClassNames = (dateString: string) => {
    const date = Temporal.PlainDate.from(dateString)
    const zonedDate = date.toZonedDateTime({
      timeZone: $app.config.timezone.value,
    })
    const classNames = ['sx__resource-date-axis__date']
    if (isToday(zonedDate, $app.config.timezone.value)) {
      classNames.push('sx__resource-date-axis__date--is-today')
    }
    return classNames.join(' ')
  }

  return (
    <div className="sx__resource-date-axis">
      {dates.map((dateString) => {
        const date = Temporal.PlainDate.from(dateString)
        const zonedDate = date.toZonedDateTime({
          timeZone: $app.config.timezone.value,
        })

        return (
          <div
            key={dateString}
            className={getClassNames(dateString)}
            style={{ gridColumn: `span ${nResources}` }}
            data-date={dateString}
          >
            <div className="sx__resource-date-axis__day-name">
              {getDayNameShort(zonedDate, $app.config.locale.value)}
            </div>
            <div className="sx__resource-date-axis__date-number">
              {date.day}/{date.month}
            </div>
          </div>
        )
      })}
    </div>
  )
}
