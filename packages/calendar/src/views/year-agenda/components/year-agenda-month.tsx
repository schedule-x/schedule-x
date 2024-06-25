import { toLocalizedMonth } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { DATE_GRID_BLOCKER } from '../../../constants'
import { isSameMonth } from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { MonthAgenda as MonthAgendaType } from './../types/year-agenda'
import YearAgendaEvent from './year-agenda-event'
type props = {
  month: MonthAgendaType
}

export default function YearAgendaMonth({ month }: props) {
  const $app = useContext(AppContext)

  const monthName = toLocalizedMonth(new Date(month.date), $app.config.locale)
  let events = month.weeks.flatMap((week) => week.flatMap((day) => day.events))

  events = events.filter(
    (e, index) => events.findIndex((f) => f.id === e.id) === index
  )

  console.log('dove events ', events)

  const nEventsInDay = events.filter(
    (event) => typeof event === 'object' || event === DATE_GRID_BLOCKER
  ).length

  const getEventTranslationSingularOrPlural = (nOfAdditionalEvents: number) => {
    if (nOfAdditionalEvents === 1) return $app.translate('event')
    return $app.translate('events')
  }

  const handleClickAdditionalEvents = () => {
    if ($app.config.callbacks.onClickPlusEvents)
      $app.config.callbacks.onClickPlusEvents(month.date)
    if (
      !$app.config.views.find(
        (view) => view.name === InternalViewName.MonthGrid
      )
    )
      return

    // Timeout to display the ripple effect
    setTimeout(() => {
      $app.datePickerState.selectedDate.value = month.date
      $app.calendarState.view.value = InternalViewName.MonthGrid
    }, 250)
  }
  const dateClassNames = ['sx__year-agenda-month__header-month-name']
  if (isSameMonth(new Date(), new Date(month.date)))
    dateClassNames.push('sx__is-today')

  return (
    <div
      className="sx__year-agenda-month"
      data-date={month.date}
      onClick={() =>
        $app.config.callbacks.onClickDate &&
        $app.config.callbacks.onClickDate(month.date)
      }
      onDblClick={() => $app.config.callbacks.onDoubleClickDate?.(month.date)}
    >
      <div className="sx__year-agenda-month__header">
        <div className={dateClassNames.join(' ')}>{monthName}</div>
      </div>

      <div className="sx__year-agenda-month__events">
        {Object.values(events)
          .slice(0, $app.config.monthGridOptions.nEventsPerDay)
          .map((event, index) => {
            if (typeof event !== 'object')
              return (
                <div
                  className="sx__year-agenda-blocker sx__year-agenda-cell"
                  style={{ gridRow: index + 1 }}
                />
              )

            return (
              <YearAgendaEvent
                gridRow={index + 1}
                calendarEvent={event}
                date={month.date}
              />
            )
          })}
      </div>

      {nEventsInDay > $app.config.monthGridOptions.nEventsPerDay ? (
        <button
          className="sx__year-agenda-month__events-more sx__ripple--wide"
          onClick={handleClickAdditionalEvents}
        >
          {`+ ${
            nEventsInDay - $app.config.monthGridOptions.nEventsPerDay
          } ${getEventTranslationSingularOrPlural(
            nEventsInDay - $app.config.monthGridOptions.nEventsPerDay
          )}`}
        </button>
      ) : null}
    </div>
  )
}
