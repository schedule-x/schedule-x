import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const sortEventsByStart = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  if (a.start < b.start) return -1
  if (a.start > b.start) return 1
  return 0
}
