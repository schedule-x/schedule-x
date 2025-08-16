import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface.ts'


import { getListOfTimePropertiesForEvents } from '../event-properties/time.ts'
import { NUMBER_OF_EVENTS } from '../faker-config.ts'
import { getRandomElementOfArray } from './get-random-element-in-array.ts'
import eventTitles from '../event-properties/event-titles.ts'
import names from '../event-properties/names.ts'
import colors from '../event-properties/color.ts'
import descriptions from '../event-properties/descriptions.ts'
import locations from '../event-properties/locations.ts'
import topics from '../event-properties/topics.ts'
import calendarIds from '../event-properties/calendar-ids.ts'

export const createEvents = (monthArg: string | null = null) => {
  const events = []
  const times = getListOfTimePropertiesForEvents(monthArg)

  while (events.length < NUMBER_OF_EVENTS) {
    const time = getRandomElementOfArray(times) as {
      start: Temporal.ZonedDateTime | Temporal.PlainDate
      end: Temporal.ZonedDateTime | Temporal.PlainDate
    }

    const event = {
      title: getRandomElementOfArray(eventTitles),
      with: getRandomElementOfArray(names),
      start: time.start,
      end: time.end,
      color: getRandomElementOfArray(colors),
      isEditable: true,
      id:
        Math.random().toString(16).substring(2, 8) +
        Math.random().toString(16).substring(2, 8),
    } as CalendarEventExternal

    if (Math.random() < 0.5)
      event.description = getRandomElementOfArray(descriptions) as string
    if (Math.random() < 0.5)
      event.location = getRandomElementOfArray(locations) as string
    if (Math.random() < 0.4) event.topic = getRandomElementOfArray(topics)
    if (Math.random() < 0.3)
      event.calendarId = getRandomElementOfArray(calendarIds) as string

    events.push(event)
  }

  // Sort events according to start, for easier debugging, if something breaks
  return events.sort((a, b) => {
    const aStart = a.start.toString()
    const bStart = b.start.toString()
    if (aStart > bStart) return 1
    if (aStart < bStart) return -1

    return 0
  })
}
