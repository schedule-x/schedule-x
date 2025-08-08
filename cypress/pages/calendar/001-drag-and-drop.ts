import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import { createCalendar, viewWeek } from '../../../packages/calendar'
import '../../../packages/theme-default/src/calendar.scss'
import '../index.css'
import { createDragAndDropPlugin } from '../../../packages/drag-and-drop'
import 'temporal-polyfill/global'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  selectedDate: Temporal.PlainDate.from('2023-09-21'),
  locale: 'en-US',
  views: [viewWeek],
  defaultView: 'week',
  plugins: [createDragAndDropPlugin()],
  timezone: 'America/New_York',
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: Temporal.ZonedDateTime.from('2023-09-21T00:15-05:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-21T01:15-05:00[America/New_York]'),
    },
  ],
})

calendar.render(calendarElement)
