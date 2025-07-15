import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import TimeGridDay from '../../../components/week-grid/time-grid-day'
import TimeAxis from '../../../components/week-grid/time-axis'
import { AppContext } from '../../../utils/stateful/app-context'
import DateAxis from '../../../components/week-grid/date-axis'
import { toIntegers, toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { sortEventsForWeekView } from '../../../utils/stateless/events/sort-events-for-week'
import { createWeek } from '../../../utils/stateless/views/week/create-week'
import { positionInTimeGrid } from '../../../utils/stateless/events/position-in-time-grid'
import { positionInDateGrid } from '../../../utils/stateless/events/position-in-date-grid'
import { sortEventsByStartAndEnd } from '../../../utils/stateless/events/sort-by-start-date'
import DateGridDay from '../../../components/week-grid/date-grid-day'
import { useComputed } from '@preact/signals'
import { filterByRange } from '../../../utils/stateless/events/filter-by-range'
import { Temporal } from 'temporal-polyfill'

export const WeekWrapper: PreactViewComponent = ({ $app, id }) => {
  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.value.gridHeight}px`
  )

  const week = useComputed(() => {
    const rangeStart = $app.calendarState.range.value?.start
    const rangeEnd = $app.calendarState.range.value?.end
    if (!rangeStart || !rangeEnd) return {}

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
          start: rangeStart,
          end: rangeEnd,
        }
      )
    })
    newWeek = positionInTimeGrid(timeGridEvents, newWeek, $app)

    return newWeek
  })

  return (
    <>
      <AppContext.Provider value={$app}>
        <div className="sx__week-wrapper" id={id}>
          <div className="sx__week-header">
            <div className="sx__week-header-content">
              <DateAxis
                week={Object.values(week.value).map((day) => {
                  const plainDate = Temporal.PlainDate.from(day.date)
                  return Temporal.ZonedDateTime.from({
                    year: plainDate.year,
                    month: plainDate.month,
                    day: plainDate.day,
                    timeZone: $app.config.timezone.value,
                  })
                })}
              />

              <div
                className="sx__date-grid"
                aria-label={$app.translate('Full day- and multiple day events')}
              >
                {Object.values(week.value).map((day) => (
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

            {Object.values(week.value).map((day) => {
              const { year, month, date } = toIntegers(day.date)

              const zonedDateTime = Temporal.ZonedDateTime.from({
                year,
                month: month + 1,
                day: date,
                timeZone: $app.config.timezone.value,
              })

              return (
                <TimeGridDay
                  calendarEvents={day.timeGridEvents}
                  backgroundEvents={day.backgroundEvents}
                  date={zonedDateTime}
                  key={day.date}
                />
              )
            })}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
