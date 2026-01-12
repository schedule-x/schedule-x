import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { AppContext } from '@schedule-x/shared/src/utils/stateful/app-context'
import { useComputed } from '@preact/signals'
import { createResourceWeek } from '../utils/stateless/create-resource-week'
import { sortEventsForResourceView } from '../utils/stateless/sort-events-for-resource-view'
import {
  positionTimeGridEventsInResourceGrid,
  positionDateGridEventsInResourceGrid,
} from '../utils/stateless/position-events-in-resource-grid'
import { sortEventsByStartAndEnd } from '../utils/stateless/sort-events-by-start-and-end'
import ResourceTimeAxis from './resource-time-axis'
import ResourceDateAxis from './resource-date-axis'
import ResourceHeader from './resource-header'
import ResourceTimeGridDay from './resource-time-grid-day'
import ResourceDateGrid from './resource-date-grid'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

export const ResourceViewWrapper: PreactViewComponent = ({ $app, id }) => {
  const resources = $app.config.resources.value
  const nDays = $app.config.resourceGridOptions.value.nDays
  const totalColumns = resources.length * nDays

  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.value.gridHeight}px`
  )
  document.documentElement.style.setProperty(
    '--sx-resource-view-total-columns',
    `${totalColumns}`
  )

  const resourceWeek = useComputed(() => {
    const rangeStart = $app.calendarState.range.value?.start
    const rangeEnd = $app.calendarState.range.value?.end
    if (!rangeStart || !rangeEnd) return {}

    let newResourceWeek = createResourceWeek($app)

    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value
    console.log('filteredEvents', filteredEvents)

    const { dateGridEvents, timeGridEvents } =
      sortEventsForResourceView(filteredEvents)
    console.log('dateGridEvents', dateGridEvents)
    console.log('timeGridEvents', timeGridEvents)

    // Position date grid events
    newResourceWeek = positionDateGridEventsInResourceGrid(
      dateGridEvents.sort(sortEventsByStartAndEnd),
      newResourceWeek
    )

    // Position time grid events
    newResourceWeek = positionTimeGridEventsInResourceGrid(
      timeGridEvents,
      newResourceWeek
    )

    console.log('newResourceWeek', newResourceWeek)

    return newResourceWeek
  })

  const dates = Object.keys(resourceWeek.value)

  return (
    <>
      <AppContext.Provider value={$app}>
        <div className="sx__resource-view-wrapper" id={id}>
          <div className="sx__resource-view-header">
            <div className="sx__resource-view-header-content">
              <ResourceDateAxis dates={dates} nResources={resources.length} />

              <ResourceHeader dates={dates} resources={resources} />

              <ResourceDateGrid
                resourceWeek={resourceWeek.value}
                dates={dates}
                resources={resources}
              />

              <div className="sx__resource-view-header-border" />
            </div>
          </div>

          <div className="sx__resource-view-grid">
            <ResourceTimeAxis />

            {dates.map((dateString) => {
              const { year, month, date } = toIntegers(dateString)

              return resources.map((resource) => {
                const slot = resourceWeek.value[dateString]?.[resource.id]
                if (!slot) return null

                const zonedDateTime = Temporal.ZonedDateTime.from({
                  year,
                  month: month + 1,
                  day: date,
                  timeZone: $app.config.timezone.value,
                })

                return (
                  <ResourceTimeGridDay
                    key={`${dateString}-${resource.id}`}
                    calendarEvents={slot.timeGridEvents}
                    date={zonedDateTime}
                    resource={resource}
                  />
                )
              })
            })}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
