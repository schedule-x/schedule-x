import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { Week } from '../types/week'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'

/**
 * Position date grid events for resource view.
 * Each event appears in every day it occurs in, at 100% width of its resource column.
 * Multi-day events appear in each day they span.
 */
export const positionInDateGridResource = (
  dateGridEvents: CalendarEventInternal[],
  week: Week
) => {
  const weekDates = Object.keys(week).sort()
  const firstDateOfWeek = weekDates[0]
  const lastDateOfWeek = weekDates[weekDates.length - 1]

  for (const event of dateGridEvents) {
    const eventStartDate = dateFromDateTime(event.start.toString())
    const eventEndDate = dateFromDateTime(event.end.toString())

    // Check if event overlaps with the week
    const isEventInWeek =
      (eventStartDate >= firstDateOfWeek && eventStartDate <= lastDateOfWeek) ||
      (eventEndDate >= firstDateOfWeek && eventEndDate <= lastDateOfWeek) ||
      (eventStartDate < firstDateOfWeek && eventEndDate > lastDateOfWeek)

    if (!isEventInWeek) continue

    // Find all days in the week that this event occurs in
    const eventDays = weekDates.filter((date) => {
      return date >= eventStartDate && date <= eventEndDate
    })

    // Add event to each day it occurs in
    for (const date of eventDays) {
      if (week[date]) {
        // Find the next available level (row) for this day
        let level = 0
        while (week[date].dateGridEvents[level] !== undefined) {
          level++
        }
        week[date].dateGridEvents[level] = event
      }
    }
  }

  return week
}
