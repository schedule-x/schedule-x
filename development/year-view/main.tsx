import 'temporal-polyfill/global'
import '@fontsource/open-sans'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import {
  createCalendar,
  createViewDay,
  createViewMonthGrid,
  createViewYearGrid,
} from '@schedule-x/calendar/src'
import { createEventModalPlugin } from '@schedule-x/event-modal/src'
import '../../packages/theme-default/src/calendar.scss'
import './year-view.css'

const calendar = createCalendar({
  views: [createViewYearGrid(), createViewMonthGrid(), createViewDay()],
  defaultView: 'year-grid',
  selectedDate: Temporal.PlainDate.from('2026-09-28'),
  firstDayOfWeek: 1,
  plugins: [createEventModalPlugin()],
  yearGridOptions: {
    nEventIndicatorsPerDay: 3,
  },
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
    travel: {
      colorName: 'travel',
      lightColors: {
        main: '#d56b2d',
        container: '#ffdbc8',
        onContainer: '#512400',
      },
      darkColors: {
        main: '#ffb689',
        container: '#713700',
        onContainer: '#ffdbc8',
      },
    },
  },
  events: [
    {
      id: 1,
      title: 'Winter planning',
      start: Temporal.PlainDate.from('2026-01-12'),
      end: Temporal.PlainDate.from('2026-01-14'),
      calendarId: 'work',
    },
    {
      id: 2,
      title: 'Product offsite',
      start: Temporal.PlainDate.from('2026-02-05'),
      end: Temporal.PlainDate.from('2026-02-07'),
      calendarId: 'travel',
    },
    {
      id: 7,
      title: 'Offsite dinner',
      start: Temporal.PlainDate.from('2026-02-05'),
      end: Temporal.PlainDate.from('2026-02-05'),
      calendarId: 'personal',
    },
    {
      id: 3,
      title: 'Spring break',
      start: Temporal.PlainDate.from('2026-04-03'),
      end: Temporal.PlainDate.from('2026-04-10'),
      calendarId: 'personal',
    },
    {
      id: 4,
      title: 'Design sprint',
      start: Temporal.PlainDate.from('2026-05-11'),
      end: Temporal.PlainDate.from('2026-05-15'),
      calendarId: 'work',
    },
    {
      id: 8,
      title: 'Research review',
      start: Temporal.PlainDate.from('2026-05-11'),
      end: Temporal.PlainDate.from('2026-05-11'),
      calendarId: 'personal',
    },
    {
      id: 9,
      title: 'Team dinner',
      start: Temporal.PlainDate.from('2026-05-11'),
      end: Temporal.PlainDate.from('2026-05-11'),
      calendarId: 'travel',
    },
    {
      id: 5,
      title: 'Summer holiday',
      start: Temporal.PlainDate.from('2026-07-20'),
      end: Temporal.PlainDate.from('2026-08-07'),
      calendarId: 'personal',
    },
    {
      id: 6,
      title: 'Team retreat',
      start: Temporal.PlainDate.from('2026-11-05'),
      end: Temporal.PlainDate.from('2026-11-08'),
      calendarId: 'travel',
    },
    ...[
      'Morning stand-up',
      'Roadmap review',
      'Customer interview',
      'Lunch with product',
      'Design critique',
      'Budget review',
      'Partner call',
      'Release check-in',
      'Gym session',
      'Dinner reservation',
    ].map((title, index) => ({
      id: `busy-day-${index + 1}`,
      title,
      start: Temporal.PlainDate.from('2026-09-24'),
      end: Temporal.PlainDate.from('2026-09-24'),
      calendarId: ['work', 'personal', 'travel'][index % 3],
    })),
  ],
  callbacks: {
    onClickDate(date) {
      console.log('onClickDate', date.toString())
    },
  },
})

calendar.render(document.getElementById('year-view') as HTMLElement)
