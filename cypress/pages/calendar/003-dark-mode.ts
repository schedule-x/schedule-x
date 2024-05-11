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
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { smokeTestEvents } from './__data__/smoke-data.ts'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  selectedDate: '2023-09-21',
  isDark: true,
  locale: 'en-US',
  views: [viewWeek, viewMonthGrid, viewMonthAgenda, viewDay],
  defaultView: 'week',
  plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
  events: smokeTestEvents,
})

calendar.render(calendarElement)
