import CalendarEventExternal, {
  CalendarEventInternal,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarEvents, {
  EventsFilterPredicate,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-events.interface'
import { signal } from '@preact/signals'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { externalEventToInternal } from '@schedule-x/shared/src/utils/stateless/calendar/external-event-to-internal'

export const createCalendarEventsImpl = (
  events: CalendarEventExternal[],
  config: CalendarConfigInternal
): CalendarEvents => {
  const list = signal<CalendarEventInternal[]>(
    events.map((event) => {
      return externalEventToInternal(event, config)
    })
  )

  const filterPredicate = signal<EventsFilterPredicate | undefined>(undefined)

  return {
    list,
    filterPredicate,
  }
}
