import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'

export const sortEventsByStartAndEnd = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  if (a.start === b.start) {
    if (a.end < b.end) return 1
    if (a.end > b.end) return -1
    return 0
  }

  if (a.start < b.start) return -1
  if (a.start > b.start) return 1
  return 0
}

export const sortEventsForMonthGrid = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  const aStart = dateFromDateTime(a.start)
  const bStart = dateFromDateTime(b.start)
  const aEnd = dateFromDateTime(a.end)
  const bEnd = dateFromDateTime(b.end)

  /**
   * For events that start and end at the same day, sort them by their start time.
   * If they only start on the same day but end on different days, the function needs to move on;
   * an event that starts on 5am today, but ends in 5 days, needs to be placed before an event that starts
   * today at 1am and ends later today. That way we avoid empty gaps in the grid.
   * */
  if (aStart === bStart && aEnd === bEnd) {
    if (a.start < b.start) return -1
  }

  if (aStart === bStart) {
    if (aEnd < bEnd) return 1
    if (aEnd > bEnd) return -1
    return 0
  }

  if (aStart < bStart) return -1
  if (aStart > bStart) return 1
  return 0
}
