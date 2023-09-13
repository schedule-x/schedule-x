import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
  viewWeek,
  viewMonth,
  viewDay,
} from '../../packages/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar(calendarElement, {
  // locale: 'de-DE',
  locale: 'en-US',
  // locale: 'zh-CN',
  views: [viewMonth, viewWeek, viewDay],
  defaultView: 'week',
  dayBoundaries: {
    start: '06:00',
    end: '03:00',
  },
  events: [
    {
      id: '1',
      title: 'Event 1',
      time: {
        start: '2023-09-11 09:00',
        end: '2023-09-11 11:00',
      },
    },
    {
      id: '2',
      title: 'Event 2',
      time: {
        start: '2023-09-12 00:20',
        end: '2023-09-12 01:20',
      },
    },
    {
      id: '3',
      title: 'Event 3',
      time: {
        start: '2023-09-11',
        end: '2023-09-11',
      },
    },
    {
      id: '4',
      title: 'Event 4',
      time: {
        start: '2023-09-17 13:00',
        end: '2023-09-17 16:00',
      },
    },
  ],
})

calendar.bootstrap()
