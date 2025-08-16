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
import 'temporal-polyfill/global'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  selectedDate: Temporal.PlainDate.from('2023-09-21'),
  locale: 'he-IL',
  views: [viewWeek, viewMonthGrid, viewMonthAgenda, viewDay],
  defaultView: 'week',
  showWeekNumbers: true,
  plugins: [createEventModalPlugin()],
  timezone: 'America/New_York',
  events: [
    {
      id: 1,
      title: 'פגישה עם הצוות',
      description: 'פגישה עם הצוות',
      start: Temporal.ZonedDateTime.from('2023-09-18T03:10-04:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-18T04:30-04:00[America/New_York]'),
    },
    {
      id: 2,
      title: 'פגישה עם הלקוח',
      start: Temporal.ZonedDateTime.from('2023-09-21T00:00-04:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-21T01:00-04:00[America/New_York]'),
    },
    {
      id: 3,
      title: 'פגישה עם המועמד',
      start: Temporal.ZonedDateTime.from('2023-09-19T07:00-04:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-19T09:00-04:00[America/New_York]'),
    },
    {
      id: 4,
      start: Temporal.ZonedDateTime.from('2023-09-21T04:00-04:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-21T04:30-04:00[America/New_York]'),
    },
    {
      id: 5,
      start: Temporal.ZonedDateTime.from('2023-09-21T16:00-04:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-21T18:00-04:00[America/New_York]'),
    },
    {
      id: 6,
      start: Temporal.ZonedDateTime.from('2023-09-21T18:00-04:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-21T20:00-04:00[America/New_York]'),
    },
    {
      id: 7,
      start: Temporal.ZonedDateTime.from('2023-09-21T20:00-04:00[America/New_York]'),
      end: Temporal.ZonedDateTime.from('2023-09-21T22:00-04:00[America/New_York]'),
    }
  ],
})

calendar.render(calendarElement)
