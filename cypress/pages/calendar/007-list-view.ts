import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
  viewList
} from '../../../packages/calendar/src'
import '@schedule-x/theme-default/dist/index.css'
import '../index.css'
import { addDays, CalendarEvent } from '@schedule-x/shared'
import { eventsDB } from './007-list-view-db.ts'
import { createEventsServicePlugin } from '@schedule-x/events-service'

const calendarElement = document.getElementById('calendar') as HTMLElement

const eventsService = createEventsServicePlugin()

const getEventsBetween = (start: string, end: string): CalendarEvent[] => {
  return eventsDB.filter((event => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)
    const rangeStart = new Date(start)
    const rangeEnd = new Date(end)

    return (eventStart >= rangeStart && eventStart <= rangeEnd) ||
           (eventEnd >= rangeStart && eventEnd <= rangeEnd) ||
           (eventStart <= rangeStart && eventEnd >= rangeEnd)
  }))
}

let currentStart = '2026-06-23'
let currentEnd = '2026-06-25'
let currentNOfEvents = 0

const initialEvents = getEventsBetween(currentStart, currentEnd)
console.log('Initial events count:', initialEvents.length)

const calendar = createCalendar({
  views: [viewList],
  plugins: [eventsService],
  defaultView: 'week',
  events: initialEvents,
  callbacks: {
    onScrollDayIntoView: (date) => {
      const dateMinus30 = addDays(date, -30)
      const datePlus30 = addDays(date, 30)

      if (datePlus30 > currentEnd) {
        currentEnd = datePlus30
      } else if (dateMinus30 < currentStart) {
        currentStart = dateMinus30
      }

      const newEvents = getEventsBetween(currentStart, currentEnd)
      if (newEvents.length === currentNOfEvents) return

      eventsService.set(newEvents)
    }
  }
})

calendar.render(calendarElement)
