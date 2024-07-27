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

export const sortEventsByStartAndEndWithoutConsideringTime = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  const aStart = dateFromDateTime(a.start)
  const bStart = dateFromDateTime(b.start)
  const aEnd = dateFromDateTime(a.end)
  const bEnd = dateFromDateTime(b.end)

  if (aStart === bStart) {
    if (aEnd < bEnd) return 1
    if (aEnd > bEnd) return -1
    return 0
  }

  if (aStart < bStart) return -1
  if (aStart > bStart) return 1
  return 0
}
