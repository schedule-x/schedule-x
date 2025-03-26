import { CalendarEventInternal } from '@schedule-x/shared'

export const wasEventAddedInLastSecond = (
  calendarEvent: CalendarEventInternal
) => {
  return (
    calendarEvent._createdAt &&
    Date.now() - calendarEvent._createdAt.getTime() < 1000
  )
}
