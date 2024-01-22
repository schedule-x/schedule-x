import { MonthDay as MonthDayType } from '../types/month'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthGridEvent from './month-grid-event'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { DATE_GRID_BLOCKER } from '../../../constants'
import { isToday } from '@schedule-x/shared/src/utils/stateless/time/comparison'

type props = {
  day: MonthDayType
  isFirstWeek: boolean
}

const EVENT_LIMIT_CONFIG = 4

export default function MonthGridDay({ day, isFirstWeek }: props) {
  const $app = useContext(AppContext)
  const nEventsInDay = Object.values(day.events).filter(
    (event) => typeof event === 'object' || event === DATE_GRID_BLOCKER
  ).length

  const getEventTranslationSingularOrPlural = (nOfAdditionalEvents: number) => {
    if (nOfAdditionalEvents === 1) return $app.translate('event')

    return $app.translate('events')
  }

  const handleClickAdditionalEvents = () => {
    if (!$app.config.views.find((view) => view.name === InternalViewName.Day))
      return

    // Timeout to display the ripple effect
    setTimeout(() => {
      $app.datePickerState.selectedDate.value = day.date
      $app.calendarState.view.value = InternalViewName.Day
    }, 250)
  }

  const dateClassNames = ['sx__month-grid-day__header-date']
  if (isToday(toJSDate(day.date))) dateClassNames.push('sx__is-today')

  return (
    <div
      className="sx__month-grid-day"
      data-date={day.date}
      onClick={() =>
        $app.config.callbacks.onClickDate &&
        $app.config.callbacks.onClickDate(day.date)
      }
    >
      <div className="sx__month-grid-day__header">
        {isFirstWeek ? (
          <div className="sx__month-grid-day__header-day-name">
            {getDayNameShort(toJSDate(day.date), $app.config.locale)}
          </div>
        ) : null}

        <div className={dateClassNames.join(' ')}>
          {toJSDate(day.date).getDate()}
        </div>
      </div>

      <div className="sx__month-grid-day__events">
        {Object.values(day.events)
          .slice(0, EVENT_LIMIT_CONFIG)
          .map((event, index) => {
            if (typeof event !== 'object')
              return (
                <div
                  className="sx__month-grid-blocker sx__month-grid-cell"
                  style={{ gridRow: index + 1 }}
                />
              )

            return (
              <MonthGridEvent
                gridRow={index + 1}
                calendarEvent={event}
                date={day.date}
              />
            )
          })}
      </div>

      {nEventsInDay > EVENT_LIMIT_CONFIG ? (
        <button
          className="sx__month-grid-day__events-more sx__ripple--wide"
          onClick={handleClickAdditionalEvents}
        >
          {`+ ${
            nEventsInDay - EVENT_LIMIT_CONFIG
          } ${getEventTranslationSingularOrPlural(
            nEventsInDay - EVENT_LIMIT_CONFIG
          )}`}
        </button>
      ) : null}
    </div>
  )
}
