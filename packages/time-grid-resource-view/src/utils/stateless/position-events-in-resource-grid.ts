import { ResourceWeek } from '../../types/resource'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

/**
 * Get resourceId from an internal event (stored in foreign properties)
 */
const getResourceId = (event: CalendarEventInternal): string | undefined => {
  const foreignProps = event._getForeignProperties()
  return foreignProps.resourceId as string | undefined
}

/**
 * Position timed events into the resource week grid
 */
export const positionTimeGridEventsInResourceGrid = (
  timeGridEvents: CalendarEventInternal[],
  resourceWeek: ResourceWeek
): ResourceWeek => {
  for (const event of timeGridEvents) {
    const resourceId = getResourceId(event)
    if (!resourceId) continue

    // Get the date from the event start
    const eventDate = dateFromDateTime(event.start.toString())

    // Add to the appropriate resource column if the date exists in our grid
    if (resourceWeek[eventDate] && resourceWeek[eventDate][resourceId]) {
      resourceWeek[eventDate][resourceId].timeGridEvents.push(event)
    }
  }

  return resourceWeek
}

/**
 * Position date grid (full-day/multi-day) events into the resource week grid
 * Multi-day events are copied to each day they span (like month agenda view)
 */
export const positionDateGridEventsInResourceGrid = (
  dateGridEvents: CalendarEventInternal[],
  resourceWeek: ResourceWeek
): ResourceWeek => {
  const dates = Object.keys(resourceWeek)

  for (const event of dateGridEvents) {
    const resourceId = getResourceId(event)
    if (!resourceId) continue

    // For each date in the grid, check if this event spans it
    for (const dateString of dates) {
      const dayStart = Temporal.PlainDate.from(dateString)
      const dayEnd = dayStart

      // Get event start/end as plain dates for comparison
      const eventStart =
        event.start instanceof Temporal.PlainDate
          ? event.start
          : Temporal.PlainDate.from(
              toDateString(event.start as Temporal.ZonedDateTime)
            )
      const eventEnd =
        event.end instanceof Temporal.PlainDate
          ? event.end
          : Temporal.PlainDate.from(
              toDateString(event.end as Temporal.ZonedDateTime)
            )

      // Check if event spans this day
      const eventSpansThisDay =
        Temporal.PlainDate.compare(eventStart, dayEnd) <= 0 &&
        Temporal.PlainDate.compare(eventEnd, dayStart) >= 0

      if (eventSpansThisDay && resourceWeek[dateString][resourceId]) {
        resourceWeek[dateString][resourceId].dateGridEvents.push(event)
      }
    }
  }

  return resourceWeek
}
