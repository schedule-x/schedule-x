import CalendarAppSingleton from '../../../interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '../../../interfaces/calendar/calendar-event.interface'

export const invokeOnEventClickCallback = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal,
  e: UIEvent
) => {
  if ($app.config.callbacks.onEventClick) {
    $app.config.callbacks.onEventClick(calendarEvent._getExternalEvent(), e)
  }
}
