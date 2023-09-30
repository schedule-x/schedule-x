import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const sortEventsByStart = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  if (a.time.start < b.time.start) return -1
  if (a.time.start > b.time.start) return 1
  return 0
}
