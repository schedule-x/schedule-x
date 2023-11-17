import CalendarEventExternal from './calendar-event.interface'

export interface CalendarCallbacks {
  onEventUpdate?: (event: CalendarEventExternal) => void
}
