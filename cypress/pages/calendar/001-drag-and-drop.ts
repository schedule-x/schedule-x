/* eslint-disable max-lines */
import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import { createCalendar, viewWeek } from '@schedule-x/calendar/src'
import '../../../packages/theme-default/src/calendar.scss'
import '../index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop/src'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar(calendarElement, {
  datePicker: {
    selectedDate: '2023-09-21',
  },
  locale: 'en-US',
  views: [viewWeek],
  defaultView: 'week',
  plugins: [createDragAndDropPlugin()],
  events: [
    {
      id: 1,
      title: 'Event 1',
      time: {
        start: '2023-09-21 00:15',
        end: '2023-09-21 01:15',
      },
    },
  ],
})

calendar.bootstrap()
