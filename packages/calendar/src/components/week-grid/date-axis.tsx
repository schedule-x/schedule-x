import { WeekWithDates } from '@schedule-x/shared/src/types/time'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { isToday } from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { getClassNameForWeekday } from '../../utils/stateless/get-class-name-for-weekday'
import { randomStringId, toDateString } from '@schedule-x/shared/src'

type props = {
  week: WeekWithDates
}

export default function DateAxis({ week }: props) {
  const $app = useContext(AppContext)

  const getClassNames = (date: Temporal.ZonedDateTime) => {
    const classNames = [
      'sx__week-grid__date',
      getClassNameForWeekday(date.dayOfWeek),
    ]
    if (isToday(date)) {
      classNames.push('sx__week-grid__date--is-today')
    }

    return classNames.join(' ')
  }

  const weekGridDateCustomComponentFn =
    $app.config._customComponentFns.weekGridDate
  const weekGridDateCCIDs = useState(() =>
    Array.from({ length: 7 }, () => `custom-week-grid-date-${randomStringId()}`)
  )
  useEffect(() => {
    if (weekGridDateCustomComponentFn) {
      week.forEach((date, idx) => {
        const el = document.querySelector(
          `[data-ccid="${weekGridDateCCIDs[0][idx]}"]`
        )
        if (!(el instanceof HTMLElement)) {
          return console.warn(
            'Could not find element for custom component weekGridDate'
          )
        }

        weekGridDateCustomComponentFn(el, {
          date: toDateString(date),
        })
      })
    }
  }, [week])

  return (
    <>
      <div className="sx__week-grid__date-axis">
        {week.map((date, idx) => (
          <div className={getClassNames(date)} data-date={toDateString(date)}>
            {weekGridDateCustomComponentFn && (
              <div data-ccid={weekGridDateCCIDs[0][idx]} />
            )}

            {!weekGridDateCustomComponentFn && (
              <>
                <div className="sx__week-grid__day-name">
                  {getDayNameShort(date, $app.config.locale.value)}
                </div>

                <div className="sx__week-grid__date-number">
                  {date.day}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
