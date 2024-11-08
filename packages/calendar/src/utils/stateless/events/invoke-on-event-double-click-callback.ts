import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const invokeOnEventDoubleClickCallback = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  if ($app.config.callbacks.onDoubleClickEvent) {
    $app.config.callbacks.onDoubleClickEvent(calendarEvent._getExternalEvent())
  }
}
