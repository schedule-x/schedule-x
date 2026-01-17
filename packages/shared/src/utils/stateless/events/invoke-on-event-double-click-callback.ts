import CalendarAppSingleton from '../../../interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '../../../interfaces/calendar/calendar-event.interface'

export const invokeOnEventDoubleClickCallback = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal,
  e: UIEvent
) => {
  if ($app.config.callbacks.onDoubleClickEvent) {
    $app.config.callbacks.onDoubleClickEvent(
      calendarEvent._getExternalEvent(),
      e
    )
  }
}
