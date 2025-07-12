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
  const aStartDate = dateFromDateTime(a._startLocal)
  const bStartDate = dateFromDateTime(b._startLocal)
  const aEndDate = dateFromDateTime(a._endLocal)
  const bEndDate = dateFromDateTime(b._endLocal)

  /**
   * For events that start and end at the same day, sort them by their start time.
   * If they only start on the same day but end on different days, the function needs to move on;
   * an event that starts on 5am today, but ends in 5 days, needs to be placed before an event that starts
   * today at 1am and ends later today. That way we avoid empty gaps in the grid.
   * */
  if (aStartDate === bStartDate && aEndDate === bEndDate) {
    if (a._startLocal < b._startLocal) return -1
  }

  if (aStartDate === bStartDate) {
    if (aEndDate < bEndDate) return 1
    if (aEndDate > bEndDate) return -1
    return 0
  }

  if (aStartDate < bStartDate) return -1
  if (aStartDate > bStartDate) return 1
  return 0
}
