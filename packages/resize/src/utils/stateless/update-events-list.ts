import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const updateEventsList = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal,
  oldEventEnd: string,
  newEventEnd: string
) => {
  const rrule = calendarEvent._getForeignProperties().rrule
  calendarEvent.end = newEventEnd

  if (rrule && $app.config.plugins.eventRecurrence) {
    $app.config.plugins.eventRecurrence.updateRecurrenceOnResize(
      calendarEvent.id,
      oldEventEnd,
      newEventEnd
    )
    return
  }

  $app.calendarEvents.list.value = [...$app.calendarEvents.list.value]
}
