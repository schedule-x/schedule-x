import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const updateEventsList = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal,
  oldEventEnd: string,
  newEventEnd: string
) => {
  const rrule = calendarEvent._getForeignProperties().rrule

  if (rrule && $app.config.plugins.eventRecurrence) {
    $app.config.plugins.eventRecurrence.updateRecurrenceOnResize(
      calendarEvent.id,
      oldEventEnd,
      newEventEnd
    )
    return
  }

  const eventToUpdate = $app.calendarEvents.list.value.find(
    (event) => event.id === calendarEvent.id
  )
  if (!eventToUpdate) return

  eventToUpdate.end = calendarEvent.end
  $app.calendarEvents.list.value = [...$app.calendarEvents.list.value]
}
