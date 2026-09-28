import 'temporal-polyfill/global'
import '@fontsource/open-sans'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import { createCalendar, viewYearGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const calendar = createCalendar({
  selectedDate: Temporal.PlainDate.from('2024-09-28'),
  views: [viewYearGrid],
  defaultView: 'year-grid',
  calendars: {
    work: {
      colorName: 'work',
      lightColors: {
        main: '#5b57c8',
        container: '#e5e3ff',
        onContainer: '#201d72',
      },
      darkColors: {
        main: '#c5c2ff',
        container: '#403b98',
        onContainer: '#e5e3ff',
      },
    },
    personal: {
      colorName: 'personal',
      lightColors: {
        main: '#008577',
        container: '#b8f0e8',
        onContainer: '#003731',
      },
      darkColors: {
        main: '#72d8ca',
        container: '#005047',
        onContainer: '#b8f0e8',
      },
    },
  },
  events: [
    {
      id: 1,
      title: 'Winter planning',
      start: Temporal.PlainDate.from('2024-01-15'),
      end: Temporal.PlainDate.from('2024-01-17'),
      calendarId: 'work',
    },
    {
      id: 2,
      title: 'Morning stand-up',
      start: Temporal.PlainDate.from('2024-09-24'),
      end: Temporal.PlainDate.from('2024-09-24'),
      calendarId: 'work',
    },
    {
      id: 3,
      title: 'Customer interview',
      start: Temporal.PlainDate.from('2024-09-24'),
      end: Temporal.PlainDate.from('2024-09-24'),
      calendarId: 'personal',
    },
    {
      id: 4,
      title: 'Design critique',
      start: Temporal.PlainDate.from('2024-09-24'),
      end: Temporal.PlainDate.from('2024-09-24'),
      calendarId: 'work',
    },
  ],
})

calendar.render(document.getElementById('calendar') as HTMLElement)
