import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

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
