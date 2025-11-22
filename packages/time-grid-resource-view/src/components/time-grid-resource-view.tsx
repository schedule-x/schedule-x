import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useComputed } from '@preact/signals'
import { useMemo } from 'preact/hooks'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { createWeek } from '../utils/create-week'
import { sortEventsForTimeGrid } from '../utils/sort-events'
import { positionInTimeGrid } from '../utils/position-in-time-grid'
import { positionInDateGridResource } from '../utils/position-in-date-grid-resource'
import { sortEventsByStartAndEnd } from '../utils/sort-by-start-date'
import { Week } from '../types/week'
import { Resource } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import TimeGridResourceDay from './time-grid-resource-day'
import TimeAxis from './time-axis'
import DateAxis from './date-axis'
import ResourceAxis from './resource-axis'
import DateGridResource from './date-grid-resource'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const TimeGridResourceView: PreactViewComponent = ({ $app, id }) => {
  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.value.gridHeight}px`
  )

  const week = useComputed(() => {
    const rangeStart = $app.calendarState.range.value?.start
    const rangeEnd = $app.calendarState.range.value?.end
    if (!rangeStart || !rangeEnd)
      return { week: {}, weekByResource: {}, sortedResources: [] }

    // Get sorted resources inside computed
    const resources = $app.config.resources?.value || []
    const sortedResources = [...resources].sort((a, b) => {
      if (a.ordering !== undefined && b.ordering !== undefined) {
        return a.ordering - b.ordering
      }
      if (a.ordering !== undefined) return -1
      if (b.ordering !== undefined) return 1
      return 0
    })

    let newWeek = createWeek($app)
    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value

    // Filter events to only those with resourceId that matches a configured resource
    const resourceIds = new Set(sortedResources.map((r) => r.id))
    const eventsWithResources = filteredEvents.filter((event) => {
      const resourceId = event._resourceId
      return resourceId && resourceIds.has(resourceId)
    })

    // Group events by resource and day
    const weekByResource: Record<string, Week> = {}

    sortedResources.forEach((resource) => {
      const resourceEvents = eventsWithResources.filter(
        (event) => event._resourceId === resource.id
      )

      const { dateGridEvents, timeGridEvents } =
        sortEventsForTimeGrid(resourceEvents)

      // Create a week structure for this resource
      const resourceWeek = createWeek($app)

      // Position date grid events for this resource (full-day and multi-day)
      const weekWithDateGrid = positionInDateGridResource(
        dateGridEvents,
        resourceWeek
      )

      // Position time grid events for this resource
      const positionedWeek = positionInTimeGrid(
        timeGridEvents,
        weekWithDateGrid,
        $app
      )

      weekByResource[resource.id] = positionedWeek
    })

    return { week: newWeek, weekByResource, sortedResources }
  })

  const weekDates = Object.keys(week.value.week || {}).sort()
  const sortedResources = week.value.sortedResources || []

  // Early return if no resources or no week dates
  if (sortedResources.length === 0) {
    return (
      <div className="sx__time-grid-resource-view" id={id}>
        <div>No resources configured</div>
      </div>
    )
  }

  if (weekDates.length === 0) {
    return (
      <div className="sx__time-grid-resource-view" id={id}>
        <div>No week dates available</div>
      </div>
    )
  }

  return (
    <div className="sx__time-grid-resource-view" id={id}>
      <div className="sx__week-header">
        <div className="sx__week-header-content">
          <DateAxis
            week={weekDates.map((date) => {
              const plainDate = Temporal.PlainDate.from(date)
              return Temporal.ZonedDateTime.from({
                year: plainDate.year,
                month: plainDate.month,
                day: plainDate.day,
                timeZone: $app.config.timezone.value,
              })
            })}
            $app={$app}
          />

          <ResourceAxis
            weekDates={weekDates}
            sortedResources={sortedResources}
          />

          <DateGridResource
            weekDates={weekDates}
            sortedResources={sortedResources}
            weekByResource={week.value.weekByResource || {}}
            $app={$app}
          />

          <div className="sx__week-header-border" />
        </div>
      </div>

      <div className="sx__week-grid">
        <TimeAxis $app={$app} />

        {weekDates.map((date) => {
          const { year, month, date: day } = toIntegers(date)

          const zonedDateTime = Temporal.ZonedDateTime.from({
            year,
            month: month + 1,
            day: day,
            timeZone: $app.config.timezone.value,
          })

          return (
            <div
              key={date}
              className="sx__time-grid-resource-day"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                minWidth: 0,
              }}
            >
              {sortedResources.map((resource, resourceIndex) => {
                const resourceWeek = week.value.weekByResource?.[resource.id]
                const resourceDay = resourceWeek?.[date]
                const isLastResource =
                  resourceIndex === sortedResources.length - 1

                return (
                  <div
                    key={`${date}-${resource.id}`}
                    className="sx__time-grid-resource-column"
                    data-resource-id={resource.id}
                    data-is-last-resource={isLastResource}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: 0,
                    }}
                  >
                    <div style={{ flex: 1, minHeight: 0 }}>
                      <TimeGridResourceDay
                        calendarEvents={resourceDay?.timeGridEvents || []}
                        backgroundEvents={[]}
                        date={zonedDateTime}
                        $app={$app}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
