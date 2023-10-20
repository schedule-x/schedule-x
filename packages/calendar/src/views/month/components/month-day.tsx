import { MonthDay as MonthDayType } from '../types/month'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext } from 'preact/compat'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthGridEvent from './month-grid-event'
import { InternalViewName } from '../../../enums/internal-view.enum'

type props = {
  day: MonthDayType
  isFirstWeek: boolean
}

const EVENT_LIMIT_CONFIG = 4

export default function MonthDay({ day, isFirstWeek }: props) {
  const $app = useContext(AppContext)
  const nEventsInDay = Object.values(day.events).filter(
    (event) => typeof event === 'object'
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

  return (
    <div className="sx__month-day" data-date={day.date}>
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

      <div className="sx__month-day-events">
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
          className="sx__month-day-events-more sx__ripple--wide"
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
