import { PreactViewComponent } from '../../types/preact-view-component'
import { useEffect, useState } from 'preact/compat'
import TimeGridDay from '../../components/week-grid/time-grid-day'
import TimeAxis from '../../components/week-grid/time-axis'
import { AppContext } from '../../utils/stateful/app-context'
import DateAxis from '../../components/week-grid/date-axis'
import { WeekDayContexts } from '../../types/week-day-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { sortEventsForWeekView } from '../../utils/stateless/events/sort-events-for-week'
import { createWeekDayContexts } from '../../utils/stateless/views/week/create-week-day-contexts'
import { positionInTimeGrid } from '../../utils/stateless/events/position-in-time-grid'
import { positionInDateGrid } from '../../utils/stateless/events/position-in-date-grid'
import { sortEventsByStart } from '../../utils/stateless/events/sort-by-start-date'
import DateGridDay from '../../components/week-grid/date-grid-day'

export const WeekWrapper: PreactViewComponent = ({ $app, id }) => {
  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.gridHeight}px`
  )

  const [weekDayContexts, setWeekDayContexts] = useState<WeekDayContexts>({})

  const sortEventsIntoDateAndTimeGrids = () => {
    let contexts = createWeekDayContexts($app)
    const { dateGridEvents, timeGridEvents } = sortEventsForWeekView(
      $app.calendarEvents.list.value
    )
    contexts = positionInDateGrid(
      dateGridEvents.sort(sortEventsByStart),
      contexts
    )
    contexts = positionInTimeGrid(timeGridEvents, contexts, $app)
    setWeekDayContexts(contexts)
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
                week={Object.values(weekDayContexts).map((context) =>
                  toJSDate(context.date)
                )}
              />

              <div className="sx__date-grid">
                {Object.values(weekDayContexts).map((dayContext) => (
                  <DateGridDay calendarEvents={dayContext.dateGridEvents} />
                ))}
              </div>

              <div className="sx__week-header-border" />
            </div>
          </div>

          <div className="sx__week-grid">
            <TimeAxis />

            {Object.values(weekDayContexts).map((dayContext) => (
              <TimeGridDay calendarEvents={dayContext.timeGridEvents} />
            ))}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
