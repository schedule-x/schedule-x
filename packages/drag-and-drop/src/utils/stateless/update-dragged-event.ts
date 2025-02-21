import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

const updateRecurringEvent = (
  $app: CalendarAppSingleton,
  eventCopy: CalendarEventInternal,
  startPreDrag: string
) => {
  $app.config.plugins.eventRecurrence?.updateRecurrenceDND(
    eventCopy.id,
    startPreDrag,
    eventCopy.start
  )
}

const updateNonRecurringEvent = (
  $app: CalendarAppSingleton,
  eventCopy: CalendarEventInternal
) => {
  const eventToUpdate = $app.calendarEvents.list.value.find(
    (event) => event.id === eventCopy.id
  )
  if (!eventToUpdate) return

  eventToUpdate.start = eventCopy.start
  eventToUpdate.end = eventCopy.end
  $app.calendarEvents.list.value = [...$app.calendarEvents.list.value]
}

export const updateDraggedEvent = (
  $app: CalendarAppSingleton,
  eventCopy: CalendarEventInternal,
  startPreDrag: string
) => {
  if (
    'rrule' in eventCopy._getForeignProperties() &&
    $app.config.plugins.eventRecurrence
  ) {
    updateRecurringEvent($app, eventCopy, startPreDrag)
  } else {
    updateNonRecurringEvent($app, eventCopy)
  }

  if ($app.config.callbacks.onEventUpdate) {
    // Find the newly updated event, because only then the rrule has been updated. It is not updated directly on the event copy
    const newEvent = $app.calendarEvents.list.value.find(
      (event) => event.id === eventCopy.id && !event.isCopy
    )
    $app.config.callbacks.onEventUpdate(newEvent!._getExternalEvent())
  }
}
