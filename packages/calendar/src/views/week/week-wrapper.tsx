import { PreactViewComponent } from '../../types/preact-view-component'
import { useEffect, useState } from 'preact/compat'
import { default as WeekDayComponent } from '../../components/week-grid/week-day'
import TimeAxis from '../../components/week-grid/time-axis'
import { AppContext } from '../../utils/stateful/app-context'
import DateAxis from '../../components/week-grid/date-axis'
import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'
import { WeekDayContext } from '../../types/week-day-context'
import { toJSDate } from '../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { sortEventsForWeekView } from '../../utils/stateless/events/sort-events'
import { getWeekDayContexts } from '../../utils/stateless/views/week/get-week-day-contexts'

type WeekDayContexts = Record<string, WeekDayContext>
export const WeekWrapper: PreactViewComponent = ({ $app, id }) => {
  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.gridHeight}px`
  )

  const [weekDayContexts, setWeekDayContexts] = useState<WeekDayContexts>({})
  const [headerEvents, setHeaderEvents] = useState<CalendarEventInternal[]>([])

  const sortEventsIntoDaysOrHeader = (contexts: WeekDayContexts) => {
    const newContexts = { ...contexts }

    const { updatedWeekDayContexts, headerEvents } = sortEventsForWeekView(
      $app,
      newContexts
    )

    setWeekDayContexts(updatedWeekDayContexts)
    setHeaderEvents(headerEvents)
  }

  useEffect(() => {
    const rangeStart = $app.calendarState.range.value?.start
    const rangeEnd = $app.calendarState.range.value?.end
    if (!rangeStart || !rangeEnd) return

    const contexts = getWeekDayContexts($app)
    sortEventsIntoDaysOrHeader(contexts)
  }, [
    $app.calendarState.range.value?.start,
    $app.calendarState.range.value?.end,
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

              <div className="sx__week-header-border" />
            </div>
          </div>

          <div className="sx__week-grid">
            <TimeAxis />

            {Object.values(weekDayContexts).map((dayContext) => (
              <WeekDayComponent calendarEvents={dayContext.calendarEvents} />
            ))}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
