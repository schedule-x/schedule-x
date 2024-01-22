import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const replaceOriginalWithCopy = (
  $app: CalendarAppSingleton,
  eventCopy: CalendarEventInternal
) => {
  // TODO: put under test
  if (
    'rrule' in eventCopy._getForeignProperties() &&
    $app.config.plugins.eventRecurrence
  ) {
    $app.config.plugins.eventRecurrence.updateRecurrenceGroup(
      eventCopy.id,
      eventCopy.start,
      eventCopy.end
    )
    return
  }

  const eventToUpdate = $app.calendarEvents.list.value.find(
    (event) => event.id === eventCopy.id
  )
  if (!eventToUpdate) return

  eventToUpdate.start = eventCopy.start
  eventToUpdate.end = eventCopy.end
  $app.calendarEvents.list.value = [...$app.calendarEvents.list.value]

  if ($app.config.callbacks.onEventUpdate) {
    $app.config.callbacks.onEventUpdate(eventCopy._getExternalEvent())
  }
}
