import { CalendarAppSingleton } from '@schedule-x/shared'

type EventTime = {
  start: string
  end: string
}
/**
 * return ids of all events tha t overlap with either the old event or the new event
 * */
export const findAllOverlappingEvents = (
  oldEventTime: EventTime,
  newEventTime: EventTime,
  $app: CalendarAppSingleton
) => {
  if ($app.calendarEvents.list.value.length === 0)
    throw new Error('No events found')

  const overlappingEvents = $app.calendarEvents.list.value.filter((event) => {
    return [oldEventTime, newEventTime].some(
      (time) =>
        (event.start <= time.start && event.end >= time.start) ||
        (event.start <= time.end && event.end >= time.end) ||
        (event.start >= time.start && event.end <= time.end)
    )
  })
  return overlappingEvents.map((event) => event.id)
}
