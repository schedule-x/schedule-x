import { WeekWithDates } from '@schedule-x/shared/src/types/time'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useEffect, useState } from 'preact/hooks'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { isToday } from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { randomStringId, toDateString } from '@schedule-x/shared/src'

type props = {
  week: WeekWithDates
  $app: CalendarAppSingleton
}

const getClassNameForWeekday = (dayOfWeek: number) => {
  const classNames: Record<number, string> = {
    0: 'sx__week-grid__date--sunday',
    1: 'sx__week-grid__date--monday',
    2: 'sx__week-grid__date--tuesday',
    3: 'sx__week-grid__date--wednesday',
    4: 'sx__week-grid__date--thursday',
    5: 'sx__week-grid__date--friday',
    6: 'sx__week-grid__date--saturday',
  }
  return classNames[dayOfWeek] || ''
}

export default function DateAxis({ week, $app }: props) {
  const getClassNames = (date: Temporal.ZonedDateTime) => {
    const classNames = [
      'sx__week-grid__date',
      getClassNameForWeekday(date.dayOfWeek),
    ]
    if (isToday(date, $app.config.timezone.value)) {
      classNames.push('sx__week-grid__date--is-today')
    }

    return classNames.join(' ')
  }

  const weekGridDateCustomComponentFn =
    $app.config._customComponentFns.weekGridDate
  const weekGridDateCCIDs = useState(() =>
    Array.from(
      { length: week.length },
      () => `custom-week-grid-date-${randomStringId()}`
    )
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
    <div className="sx__week-grid__date-axis">
      {week.map((date, index) => (
        <div key={index} className={getClassNames(date)}>
          {weekGridDateCustomComponentFn && (
            <div data-ccid={weekGridDateCCIDs[0][index]} />
          )}
          {!weekGridDateCustomComponentFn && (
            <>
              <div className="sx__week-grid__day-name">
                {getDayNameShort(date, $app.config.locale.value)}
              </div>
              <div className="sx__week-grid__date-number">{date.day}</div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
