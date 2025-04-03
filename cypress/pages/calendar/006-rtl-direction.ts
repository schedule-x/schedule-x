import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import '../index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  selectedDate: '2023-09-21',
  locale: 'he-IL',
  views: [viewWeek, viewMonthGrid, viewMonthAgenda, viewDay],
  defaultView: 'week',
  showWeekNumbers: true,
  plugins: [createEventModalPlugin()],
  events: [
    {
      id: 1,
      title: 'פגישה עם הצוות',
      description: 'פגישה עם הצוות',
      start: '2023-09-18 03:10',
      end: '2023-09-18 04:30',
    },
    {
      id: 2,
      title: 'פגישה עם הלקוח',
      start: '2023-09-21 00:00',
      end: '2023-09-21 01:00',
    },
    {
      id: 3,
      title: 'פגישה עם המועמד',
      start: '2023-09-19 07:00',
      end: '2023-09-19 09:00',
    },
    {
      id: 4,
      start: '2023-09-21 04:00',
      end: '2023-09-21 04:30',
    },
    {
      id: 5,
      start: '2023-09-21 16:00',
      end: '2023-09-21 18:00',
    },
    {
      id: 6,
      start: '2023-09-21 18:00',
      end: '2023-09-21 20:00',
    },
    {
      id: 7,
      start: '2023-09-21 20:00',
      end: '2023-09-21 22:00',
    }
  ],
})

calendar.render(calendarElement)
