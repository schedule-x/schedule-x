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
  viewMonthGrid,
  viewDay,
  viewMonthAgenda,
} from '@schedule-x/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop/src'
import { createEventModalPlugin } from '@schedule-x/event-modal/src'
import { seededEvents } from '../data/seeded-events.ts'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar(calendarElement, {
  // locale: 'de-DE',
  locale: 'en-US',
  // locale: 'zh-CN',
  views: [viewMonthGrid, viewWeek, viewDay, viewMonthAgenda],
  defaultView: viewMonthAgenda.name,
  // dayBoundaries: {
  //   start: '06:00',
  //   end: '03:00',
  // },
  // isDark: true,
  calendars: {
    personal: {
      color: 'primary',
    },
    work: {
      color: 'tertiary',
    },
  },
  plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
  events: seededEvents,
})

calendar.bootstrap()
