import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useEffect, useState } from 'preact/hooks'
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

export const WeekWrapper: PreactViewComponent = ({ $app, id }) => {
  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.gridHeight}px`
  )

  const [week, setWeek] = useState<Week>({})

  const sortEventsIntoDateAndTimeGrids = () => {
    let newWeek = createWeek($app)
    const { dateGridEvents, timeGridEvents } = sortEventsForWeekView(
      $app.calendarEvents.list.value
    )
    newWeek = positionInDateGrid(
      dateGridEvents.sort(sortEventsByStartAndEnd),
      newWeek
    )
    newWeek = positionInTimeGrid(timeGridEvents, newWeek, $app)
    setWeek(newWeek)
  }

  useEffect(() => {
    const rangeStart = $app.calendarState.range.value?.start
    const rangeEnd = $app.calendarState.range.value?.end
    if (!rangeStart || !rangeEnd) return

    sortEventsIntoDateAndTimeGrids()
  }, [
    $app.calendarState.range.value?.start,
    $app.calendarState.range.value?.end,
    $app.calendarEvents.list.value,
  ])

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
                  <DateGridDay calendarEvents={day.dateGridEvents} />
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
                date={day.date}
                key={day.date + new Date().getTime()}
              />
            ))}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
