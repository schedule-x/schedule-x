import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarEventBuilder from '@schedule-x/shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'

export const externalEventToInternal = (
  event: CalendarEventExternal,
  config: CalendarConfigInternal
) => {
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
}
