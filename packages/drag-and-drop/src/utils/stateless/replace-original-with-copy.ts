import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const replaceOriginalWithCopy = (
  $app: CalendarAppSingleton,
  eventCopy: CalendarEventInternal
) => {
  const originalEvent = $app.calendarEvents.list.value.find(
    (event) => event.id === eventCopy.id
  )

  if (!originalEvent) return

  originalEvent.start = eventCopy.start
  originalEvent.end = eventCopy.end
  $app.calendarEvents.list.value = [...$app.calendarEvents.list.value]

  if ($app.config.callbacks.onEventUpdate) {
    $app.config.callbacks.onEventUpdate(eventCopy._getExternalEvent())
  }
}
