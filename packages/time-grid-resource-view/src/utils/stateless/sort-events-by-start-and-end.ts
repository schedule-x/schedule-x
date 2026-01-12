import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const sortEventsByStartAndEnd = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  if (a.start.toString() < b.start.toString()) return -1
  if (a.start.toString() > b.start.toString()) return 1

  // Events starting at same time: sort by duration (longer first)
  const aEnd = a.end.toString()
  const bEnd = b.end.toString()
  if (aEnd > bEnd) return -1
  if (aEnd < bEnd) return 1

  return 0
}
