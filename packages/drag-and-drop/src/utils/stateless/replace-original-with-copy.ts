import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const replaceOriginalWithCopy = (
  $app: CalendarAppSingleton,
  eventCopy: CalendarEventInternal
) => {
  const indexOfEventToUpdate = $app.calendarEvents.list.value.findIndex(
    (event) => event.id === eventCopy.id
  )
  const updatedList = [...$app.calendarEvents.list.value]
  updatedList.splice(indexOfEventToUpdate, 1, eventCopy)
  $app.calendarEvents.list.value = updatedList

  if ($app.config.callbacks.onEventUpdate) {
    $app.config.callbacks.onEventUpdate(eventCopy._getExternalEvent())
  }
}
