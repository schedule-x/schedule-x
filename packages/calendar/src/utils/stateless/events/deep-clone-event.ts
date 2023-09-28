import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import CalendarEventBuilder from '../../stateful/calendar-event/calendar-event.builder'
import CalendarAppSingleton from '../../stateful/app-singleton/calendar-app-singleton'

export const deepCloneEvent = (
  calendarEvent: CalendarEventInternal,
  $app: CalendarAppSingleton
) => {
  return new CalendarEventBuilder($app.config, calendarEvent.id, {
    ...calendarEvent.time,
  })
    .withTitle(calendarEvent.title)
    .withPeople(calendarEvent.people)
    .withCalendarId(calendarEvent.calendarId)
    .withForeignProperties(
      JSON.parse(JSON.stringify(calendarEvent._getForeignProperties()))
    )
    .withLocation(calendarEvent.location)
    .withDescription(calendarEvent.description)
    .build()
}
