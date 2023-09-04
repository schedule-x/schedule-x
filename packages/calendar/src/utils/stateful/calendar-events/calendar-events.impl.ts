import CalendarEventExternal, {
  CalendarEventInternal,
} from '../calendar-event/calendar-event.interface'
import CalendarEvents from './calendar-events.interface'
import { signal } from '@preact/signals'
import CalendarConfigInternal from '../config/calendar-config'

export const createCalendarEventsImpl = (
  events: CalendarEventExternal[],
  config: CalendarConfigInternal
): CalendarEvents => {
  const list = signal<CalendarEventInternal[]>([])

  const createInternalEvents = () => {
    // create internal calendar events from external ones
  }

  return {
    list,
    createInternalEvents,
  }
}
