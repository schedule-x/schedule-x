import CalendarEventExternal, {
  CalendarEventInternal,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarEvents from '@schedule-x/shared/src/interfaces/calendar/calendar-events.interface'
import { signal } from '@preact/signals'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { externalEventToInternal } from '../../stateless/events/external-event-to-internal'

export const createCalendarEventsImpl = (
  events: CalendarEventExternal[],
  config: CalendarConfigInternal
): CalendarEvents => {
  const list = signal<CalendarEventInternal[]>(
    events.map((event) => {
      return externalEventToInternal(event, config)
    })
  )

  const createInternalEvents = () => {
    // create internal calendar events from external ones
  }

  return {
    list,
    createInternalEvents,
  }
}
