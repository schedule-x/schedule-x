import CalendarEventExternal from '../../../interfaces/calendar/calendar-event.interface'
import CalendarConfigInternal from '../../../interfaces/calendar/calendar-config'
import CalendarEventBuilder from './calendar-event/calendar-event.builder'

export const externalEventToInternal = (
  event: CalendarEventExternal,
  config: CalendarConfigInternal
) => {
  const {
    id,
    start,
    end,
    title,
    description,
    location,
    people,
    _options,
    ...foreignProperties
  } = event
  return new CalendarEventBuilder(config, id, start, end)
    .withTitle(title)
    .withDescription(description)
    .withLocation(location)
    .withPeople(people)
    .withCalendarId(event.calendarId)
    .withOptions(_options)
    .withForeignProperties(foreignProperties)
    .build()
}
