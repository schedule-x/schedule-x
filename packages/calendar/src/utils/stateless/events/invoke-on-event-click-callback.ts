import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const invokeOnEventClickCallback = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  if ($app.config.callbacks.onEventClick) {
    $app.config.callbacks.onEventClick(calendarEvent._getExternalEvent())
  }
}
