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
import { createResizePlugin } from '../../../packages/resize'
import { smokeTestEvents } from './__data__/smoke-data.ts'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller'
import 'temporal-polyfill/global'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  selectedDate: Temporal.PlainDate.from('2023-09-21'),
  locale: 'en-US',
  views: [viewWeek, viewMonthGrid, viewMonthAgenda, viewDay],
  defaultView: 'week',
  plugins: [createDragAndDropPlugin(), createEventModalPlugin(), createScrollControllerPlugin(), createResizePlugin()],
  events: smokeTestEvents,
})

calendar.render(calendarElement)
