import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const sortEventsByStartAndEnd = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  if (a.start.toString() === b.start.toString()) {
    if (a.end.toString() < b.end.toString()) return 1
    if (a.end.toString() > b.end.toString()) return -1
    return 0
  }

  if (a.start.toString() < b.start.toString()) return -1
  if (a.start.toString() > b.start.toString()) return 1
  return 0
}
