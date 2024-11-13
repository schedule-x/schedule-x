import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useState } from 'preact/hooks'
import TimeGridDay from '../../../components/week-grid/time-grid-day'
import TimeAxis from '../../../components/week-grid/time-axis'
import { AppContext } from '../../../utils/stateful/app-context'
import DateAxis from '../../../components/week-grid/date-axis'
import { Week } from '../../../types/week'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { sortEventsForWeekView } from '../../../utils/stateless/events/sort-events-for-week'
import { createWeek } from '../../../utils/stateless/views/week/create-week'
import { positionInTimeGrid } from '../../../utils/stateless/events/position-in-time-grid'
import { positionInDateGrid } from '../../../utils/stateless/events/position-in-date-grid'
import { sortEventsByStartAndEnd } from '../../../utils/stateless/events/sort-by-start-date'
import DateGridDay from '../../../components/week-grid/date-grid-day'
import { useSignalEffect } from '@preact/signals'
import { filterByRange } from '../../../utils/stateless/events/filter-by-range'

export const WeekWrapper: PreactViewComponent = ({ $app, id }) => {
  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.value.gridHeight}px`
  )

  const [week, setWeek] = useState<Week>({})

  useSignalEffect(() => {
    const rangeStart = $app.calendarState.range.value?.start
    const rangeEnd = $app.calendarState.range.value?.end
    if (!rangeStart || !rangeEnd) return

    let newWeek = createWeek($app)
    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value
    const { dateGridEvents, timeGridEvents } =
      sortEventsForWeekView(filteredEvents)
    newWeek = positionInDateGrid(
      dateGridEvents.sort(sortEventsByStartAndEnd),
      newWeek
    )
    Object.entries(newWeek).forEach(([date, day]) => {
      day.backgroundEvents = filterByRange(
        $app.calendarEvents.backgroundEvents.value,
        {
          start: date,
          end: date,
        }
      )
    })
    newWeek = positionInTimeGrid(timeGridEvents, newWeek, $app)
    setWeek(newWeek)
  })

  return (
    <>
      <AppContext.Provider value={$app}>
        <div className="sx__week-wrapper" id={id}>
          <div className="sx__week-header">
            <div className="sx__week-header-content">
              <DateAxis
                week={Object.values(week).map((day) => toJSDate(day.date))}
              />

              <div
                className="sx__date-grid"
                aria-label={$app.translate('Full day- and multiple day events')}
              >
                {Object.values(week).map((day) => (
                  <DateGridDay
                    key={day.date}
                    date={day.date}
                    calendarEvents={day.dateGridEvents}
                    backgroundEvents={day.backgroundEvents}
                  />
                ))}
              </div>

              <div className="sx__week-header-border" />
            </div>
          </div>

          <div className="sx__week-grid">
            <TimeAxis />

            {Object.values(week).map((day) => (
              <TimeGridDay
                calendarEvents={day.timeGridEvents}
                backgroundEvents={day.backgroundEvents}
                date={day.date}
                key={day.date}
              />
            ))}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
