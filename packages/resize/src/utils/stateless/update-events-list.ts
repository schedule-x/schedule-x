import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'


export const updateEventsList = (
  $app: CalendarAppSingleton,
  eventCopy: CalendarEventInternal,
  oldEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate,
  newEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate
) => {
  const rrule = eventCopy._getForeignProperties().rrule

  if (rrule && $app.config.plugins.eventRecurrence) {
    $app.config.plugins.eventRecurrence.updateRecurrenceOnResize(
      eventCopy.id,
      oldEventEnd,
      newEventEnd
    )
    return
  }

  const eventToUpdate = $app.calendarEvents.list.value.find(
    (event) => event.id === eventCopy.id
  )
  if (!eventToUpdate) return

  eventToUpdate.end = eventCopy.end
  $app.calendarEvents.list.value = [...$app.calendarEvents.list.value]
}
