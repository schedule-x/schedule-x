/* eslint-disable max-lines */
import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import {
  createCalendar,
  viewWeek,
  viewMonthGrid,
  viewDay,
  viewMonthAgenda,
} from '../../packages/calendar/src'
// import '../../packages/theme-default/src/index.scss'
import '../../packages/theme-shadcn/src/index.scss'
import './app.css'
import { calendars } from "./calendars.ts";
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  selectedDate: '2024-05-06',
  theme: 'shadcn',
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2024-05-11 10:00',
      end: '2024-05-11 12:00',
      calendarId: 'internal',
      rrule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10'
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2024-05-11 14:00',
      end: '2024-05-11 16:00',
      calendarId: 'internal',
    },
    {
      id: 3,
      title: 'Event 3',
      start: '2024-05-11 08:00',
      end: '2024-05-11 09:00',
      calendarId: 'teamBuilding',
    },
    {
      id: 4,
      title: 'Event 4',
      start: '2024-05-11 10:00',
      end: '2024-05-11 11:00',
      calendarId: 'clients',
    },
    {
      id: 5,
      title: 'Event 5',
      start: '2024-05-06 07:00',
      end: '2024-05-06 09:10',
      calendarId: 'management',
    },
    {
      id: 6,
      title: 'Event 6',
      start: '2024-05-07',
      end: '2024-05-07',
      calendarId: 'teamBuilding',
    },
    {
      id: 7,
      title: 'Event 7',
      start: '2024-05-08',
      end: '2024-05-08',
      calendarId: 'teamBuilding',
    }
  ],
  views: [viewMonthGrid, viewWeek, viewDay, viewMonthAgenda],
  defaultView: viewWeek.name,
  callbacks: {
    onRangeUpdate(range) {
      console.log('onRangeUpdate', range)
    },

    onEventUpdate(event) {
      console.log('onEventUpdate', event)
    },

    onEventClick(event) {
      console.log('onEventClick', event)
    },

    onClickDate(date) {
      console.log('onClickDate', date)
    },

    onClickDateTime(dateTime) {
      console.log('onClickDateTime', dateTime)
    },
  },
  calendars,
  plugins: [
    createEventModalPlugin(),
    createDragAndDropPlugin()
  ],
})
calendar.render(calendarElement)

let darkToggle = 0

const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement
themeToggle.addEventListener('click', () => {
  calendar.setTheme(darkToggle % 2 === 0 ? 'dark' : 'light')
  darkToggle++
})
