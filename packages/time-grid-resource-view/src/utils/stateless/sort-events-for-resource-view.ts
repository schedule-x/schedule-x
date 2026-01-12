import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

type SortedEvents = {
  dateGridEvents: CalendarEventInternal[]
  timeGridEvents: CalendarEventInternal[]
}

export const sortEventsForResourceView = (
  events: CalendarEventInternal[]
): SortedEvents => {
  const dateGridEvents: CalendarEventInternal[] = []
  const timeGridEvents: CalendarEventInternal[] = []

  for (const event of events) {
    const isFullDayEvent = event._isSingleDayFullDay || event._isMultiDayFullDay
    const isMultiDayTimed = event._isMultiDayTimed

    if (isFullDayEvent || isMultiDayTimed) {
      dateGridEvents.push(event)
    } else {
      timeGridEvents.push(event)
    }
  }

  return { dateGridEvents, timeGridEvents }
}
