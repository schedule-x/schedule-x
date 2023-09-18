import { CalendarEventInternal } from '../../stateful/calendar-event/calendar-event.interface'

export const sortEventsForWeekView = (
  allCalendarEvents: CalendarEventInternal[]
) => {
  const dateGridEvents: CalendarEventInternal[] = []
  const timeGridEvents: CalendarEventInternal[] = []

  for (const event of allCalendarEvents) {
    if (event._isSingleDayTimed || event._isSingleHybridDayTimed) {
      timeGridEvents.push(event)
      continue
    }

    if (
      event._isSingleDayFullDay ||
      event._isMultiDayFullDay ||
      event._isMultiDayTimed
    ) {
      dateGridEvents.push(event)
    }
  }

  return { timeGridEvents, dateGridEvents }
}
