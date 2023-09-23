/* eslint-disable max-lines */
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
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop/src'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar(calendarElement, {
  // locale: 'de-DE',
  locale: 'en-US',
  // locale: 'zh-CN',
  views: [viewMonth, viewWeek, viewDay],
  defaultView: 'week',
  // dayBoundaries: {
  //   start: '06:00',
  //   end: '03:00',
  // },
  calendars: {
    personal: {
      color: 'primary',
    },
    work: {
      color: 'tertiary',
    },
  },
  plugins: [createDragAndDropPlugin()],
  events: [
    {
      id: '1',
      title: 'Event 1',
      calendarId: 'work',
      time: {
        start: '2023-09-18 09:00',
        end: '2023-09-18 09:50',
      },
      people: ['John Doe', 'Jane Doe'],
    },
    {
      id: '2',
      title: 'Event 2',
      time: {
        start: '2023-09-19 00:20',
        end: '2023-09-19 01:20',
      },
    },
    {
      id: '3',
      title: 'Event 3',
      time: {
        start: '2023-09-18',
        end: '2023-09-19',
      },
    },
    {
      id: '20',
      title: 'Event 20',
      time: {
        start: '2023-09-19',
        end: '2023-09-21',
      },
      calendarId: 'work',
    },
    {
      id: '30',
      title: 'Event 30',
      time: {
        start: '2023-09-19',
        end: '2023-09-26',
      },
    },
    {
      id: '21',
      title: 'Event 21',
      time: {
        start: '2023-09-20',
        end: '2023-09-21',
      },
    },
    {
      id: '4',
      title: 'Event 4',
      time: {
        start: '2023-09-24 13:00',
        end: '2023-09-24 14:00',
      },
    },
    {
      id: '5',
      title: 'Event 5',
      time: {
        start: '2023-09-24 13:30',
        end: '2023-09-24 16:55',
      },
    },
    {
      id: '6',
      title: 'Event 6',
      time: {
        start: '2023-09-24 14:00',
        end: '2023-09-24 15:15',
      },
    },
    {
      id: '7',
      title: 'Event 7',
      time: {
        start: '2023-09-24 15:30',
        end: '2023-09-24 16:30',
      },
    },
  ],
})

calendar.bootstrap()
