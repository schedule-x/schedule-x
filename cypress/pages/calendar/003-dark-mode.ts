import 'temporal-polyfill/global'
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
import { smokeTestEvents } from './__data__/smoke-data.ts'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  selectedDate: Temporal.PlainDate.from('2023-09-21'),
  isDark: true,
  locale: 'en-US',
  views: [viewWeek, viewMonthGrid, viewMonthAgenda, viewDay],
  defaultView: 'week',
  plugins: [createEventModalPlugin()],
  events: smokeTestEvents,
  timezone: 'America/New_York',
})

calendar.render(calendarElement)
