import CalendarEventExternal, {
  CalendarEventInternal,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarEvents from '@schedule-x/shared/src/interfaces/calendar/calendar-events.interface'
import { signal } from '@preact/signals'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarEventBuilder from '../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'

export const createCalendarEventsImpl = (
  events: CalendarEventExternal[],
  config: CalendarConfigInternal
): CalendarEvents => {
  const list = signal<CalendarEventInternal[]>(
    events.map((event) => {
      const {
        id,
        time,
        title,
        description,
        location,
        people,
        ...foreignProperties
      } = event
      return new CalendarEventBuilder(config, id, time)
        .withTitle(title)
        .withDescription(description)
        .withLocation(location)
        .withPeople(people)
        .withCalendarId(event.calendarId)
        .withForeignProperties(foreignProperties)
        .build()
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
