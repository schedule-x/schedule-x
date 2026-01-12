/* eslint-disable max-lines */
import 'temporal-polyfill/global'
import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
} from '@schedule-x/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../../packages/time-grid-resource-view/src/styles/index.scss'
import '../app.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop/src'
import { createEventModalPlugin } from '@schedule-x/event-modal/src'
import { seededEvents } from '../data/seeded-events.ts'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller/src'
import { createResizePlugin } from '../../packages/resize/src'
import {
  createEventRecurrencePlugin,
  createEventsServicePlugin,
} from '@schedule-x/event-recurrence/src'
import { createCalendarControlsPlugin } from '../../packages/calendar-controls/src'
import { createViewMonthGrid } from '@schedule-x/calendar/src/views/month-grid'
import { createViewWeek } from '@schedule-x/calendar/src/views/week'
import { createViewDay } from '@schedule-x/calendar/src/views/day'
import { createViewMonthAgenda } from '@schedule-x/calendar/src/views/month-agenda'
import { createViewList } from '@schedule-x/calendar/src/views/list'
import { createViewTimeGridResourceView } from '../../packages/time-grid-resource-view/src'
import { mergeLocales } from '@schedule-x/translations/src/utils/merge-locales.ts'
import { translations } from '@schedule-x/translations/src'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb.ts'
import '../../packages/timezone-select/src/timezone-select.scss'

import { dateStringRegex } from '@schedule-x/shared/src'
import { createCurrentTimePlugin } from '../../packages/current-time/src'
import { createTimezoneSelectPlugin, translations as timezoneSelectTranslations } from '../../packages/timezone-select/src'

const calendarElement = document.getElementById('calendar') as HTMLElement

const eventsServicePlugin = createEventsServicePlugin()
const calendarControlsPlugin = createCalendarControlsPlugin()
const scrollController = createScrollControllerPlugin({
  initialScroll: '01:00'
})
const calendar = createCalendar({
plugins: [
  createEventRecurrencePlugin(),
  eventsServicePlugin,
  createDragAndDropPlugin(),
  createEventModalPlugin(),
  createResizePlugin(),
  calendarControlsPlugin,
  scrollController,
  createCurrentTimePlugin(),
  createTimezoneSelectPlugin(),
],

  translations: mergeLocales(
    translations,
    timezoneSelectTranslations
  ),

  showWeekNumbers: true,
  /* dayBoundaries: {
    start: '20:00',
    end: '06:00'
  }, */
  firstDayOfWeek: 1,
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda(), createViewList(), createViewTimeGridResourceView()],
  defaultView: 'resource-view',
  
  resources: [
    { id: 'room-a', name: 'Room A' },
    { id: 'room-b', name: 'Room B' },
    { id: 'room-c', name: 'Room C' },
  ],
  resourceGridOptions: {
    nDays: 7,
  },
  callbacks: {
    onScrollDayIntoView(date) {
      console.log('onScrollDayIntoView: ', date)
    },

    onEventUpdate(event) {
      console.log('onEventUpdate', event)
      console.log('event.start', event.start.toString())
      console.log('event.end', event.end.toString())
    },

    onEventClick(event, e) {
      console.log('onEventClick', event, e)
    },

    onDoubleClickEvent(event, e) {
      console.log('onDoubleClickEvent', event, e)
    },

    onClickDate(date) {
      console.log('onClickDate', date)
    },

    onClickDateTime(dateTime) {
      console.log('onClickDateTime', dateTime.toString())
    },

    onClickAgendaDate(date) {
      console.log('onClickAgendaDate', date.toString())
    },

    onDoubleClickAgendaDate(date) {
      console.log('onDoubleClickAgendaDate', date.toString())
    },

    onClickPlusEvents(date) {
      console.log('onClickPlusEvents', date.toString())
    },

    onSelectedDateUpdate(date) {
      console.log('onSelectedDateUpdate', date.toString())
    },

    onDoubleClickDateTime(dateTime) {
      console.log('onDoubleClickDateTime', dateTime.toString())
    },

    onDoubleClickDate(date) {
      console.log('onDoubleClickDate', date.toString())
    },

    onRangeUpdate(range) {
      console.log('onRangeUpdate', range.start.toString(), range.end.toString())
      /* console.log(range.start.toString())
      console.log(range.end.toString()) */
    },
  },
  // selectedDate: Temporal.PlainDate.from({ year: 2024, month: 2, day: 5 }),
  calendars: {
    personal: {
      colorName: 'personal',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
      darkColors: {
        main: '#fff5c0',
        onContainer: '#fff5de',
        container: '#a29742',
      },
    },
    work: {
      colorName: 'work',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
      darkColors: {
        main: '#ffc0cc',
        onContainer: '#ffdee6',
        container: '#a24258',
      },
    },
    leisure: {
      colorName: 'leisure',
      lightColors: {
        main: '#1cf9b0',
        container: '#dafff0',
        onContainer: '#004d3d',
      },
      darkColors: {
        main: '#c0fff5',
        onContainer: '#e6fff5',
        container: '#42a297',
      },
    },
    school: {
      colorName: 'school',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
      darkColors: {
        main: '#c0dfff',
        onContainer: '#dee6ff',
        container: '#426aa2',
      },
    },
  },
  weekOptions: {
    gridStep: 30,
    gridHeight: 2000,
  },
  backgroundEvents: [
    {
      title: 'Out of office',
      start: Temporal.ZonedDateTime.from('2025-08-08T00:00:00.000+02:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2025-08-09T12:00:00.000+02:00[Europe/Berlin]'),
      style: {
        // create tilted 5px thick gray lines
        backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
      // rrule: 'FREQ=WEEKLY',
      // exdate: ['20250714T000000', '20250728T000000']
    },

    // PlainDate
    {
      title: 'Out of office 2',
      start: Temporal.PlainDate.from('2025-07-09'),
      end: Temporal.PlainDate.from('2025-07-10'),
      style: {
        backgroundImage: 'repeating-linear-gradient(45deg, #e3a, #e3a 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
    },
  ],
  locale: 'en-US',

  // tz new york
  timezone: 'Europe/London',
  events: [
    // Resource View test events - January 5, 2026 (Monday) - Week start
    {
      id: 101,
      title: 'Full Day Conference',
      start: Temporal.PlainDate.from('2026-01-05'),
      end: Temporal.PlainDate.from('2026-01-05'),
      resourceId: 'room-a',
    },
    {
      id: 1011,
      title: 'VIP Meeting',
      start: Temporal.PlainDate.from('2026-01-05'),
      end: Temporal.PlainDate.from('2026-01-05'),
      resourceId: 'room-a',
    },
    {
      id: 1012,
      title: 'Team Offsite',
      start: Temporal.PlainDate.from('2026-01-05'),
      end: Temporal.PlainDate.from('2026-01-05'),
      resourceId: 'room-b',
    },
    {
      id: 102,
      title: 'Morning Standup',
      start: Temporal.ZonedDateTime.from('2026-01-05T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T09:30[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 103,
      title: 'Team Meeting',
      start: Temporal.ZonedDateTime.from('2026-01-05T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T11:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 104,
      title: 'Client Presentation',
      start: Temporal.ZonedDateTime.from('2026-01-05T11:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T12:30[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 105,
      title: 'Lunch Break',
      start: Temporal.ZonedDateTime.from('2026-01-05T12:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T13:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 106,
      title: 'Design Review',
      start: Temporal.ZonedDateTime.from('2026-01-05T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T15:30[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 107,
      title: 'Code Review',
      start: Temporal.ZonedDateTime.from('2026-01-05T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T16:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 108,
      title: 'Evening Event',
      start: Temporal.ZonedDateTime.from('2026-01-05T18:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T20:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 109,
      title: 'Room C Opening',
      start: Temporal.ZonedDateTime.from('2026-01-05T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T10:30[Europe/London]'),
      resourceId: 'room-c',
    },
    {
      id: 110,
      title: 'Room C Setup',
      start: Temporal.ZonedDateTime.from('2026-01-05T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T16:00[Europe/London]'),
      resourceId: 'room-c',
    },
    {
      id: 111,
      title: 'Room C Training',
      start: Temporal.ZonedDateTime.from('2026-01-05T17:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T19:00[Europe/London]'),
      resourceId: 'room-c',
    },
    
    // January 6, 2026 (Tuesday)
    {
      id: 201,
      title: 'Multi-Day Event',
      start: Temporal.PlainDate.from('2026-01-06'),
      end: Temporal.PlainDate.from('2026-01-07'),
      resourceId: 'room-a',
    },
    {
      id: 2011,
      title: 'Board Meeting',
      start: Temporal.PlainDate.from('2026-01-06'),
      end: Temporal.PlainDate.from('2026-01-06'),
      resourceId: 'room-a',
    },
    {
      id: 2012,
      title: 'Customer Visit',
      start: Temporal.PlainDate.from('2026-01-06'),
      end: Temporal.PlainDate.from('2026-01-06'),
      resourceId: 'room-b',
    },
    {
      id: 2013,
      title: 'Product Launch',
      start: Temporal.PlainDate.from('2026-01-06'),
      end: Temporal.PlainDate.from('2026-01-06'),
      resourceId: 'room-b',
    },
    {
      id: 202,
      title: 'Early Morning Session',
      start: Temporal.ZonedDateTime.from('2026-01-06T07:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T08:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 203,
      title: 'Workshop Part 1',
      start: Temporal.ZonedDateTime.from('2026-01-06T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T10:30[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 204,
      title: 'Workshop Part 2',
      start: Temporal.ZonedDateTime.from('2026-01-06T10:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T12:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 205,
      title: 'Planning Meeting',
      start: Temporal.ZonedDateTime.from('2026-01-06T13:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T14:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 206,
      title: 'Training Session',
      start: Temporal.ZonedDateTime.from('2026-01-06T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T17:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 207,
      title: 'Q&A Session',
      start: Temporal.ZonedDateTime.from('2026-01-06T16:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T17:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 208,
      title: 'Room C Workshop',
      start: Temporal.ZonedDateTime.from('2026-01-06T08:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T12:00[Europe/London]'),
      resourceId: 'room-c',
    },
    {
      id: 209,
      title: 'Room C Lunch',
      start: Temporal.ZonedDateTime.from('2026-01-06T12:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T13:30[Europe/London]'),
      resourceId: 'room-c',
    },
    {
      id: 210,
      title: 'Room C Afternoon',
      start: Temporal.ZonedDateTime.from('2026-01-06T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-06T17:00[Europe/London]'),
      resourceId: 'room-c',
    },
    
    // January 7, 2026 (Wednesday)
    {
      id: 301,
      title: 'Full Day Maintenance',
      start: Temporal.PlainDate.from('2026-01-07'),
      end: Temporal.PlainDate.from('2026-01-07'),
      resourceId: 'room-b',
    },
    {
      id: 3011,
      title: 'System Upgrade',
      start: Temporal.PlainDate.from('2026-01-07'),
      end: Temporal.PlainDate.from('2026-01-07'),
      resourceId: 'room-b',
    },
    {
      id: 3012,
      title: 'Security Audit',
      start: Temporal.PlainDate.from('2026-01-07'),
      end: Temporal.PlainDate.from('2026-01-07'),
      resourceId: 'room-a',
    },
    {
      id: 3013,
      title: 'Room C Conference',
      start: Temporal.PlainDate.from('2026-01-07'),
      end: Temporal.PlainDate.from('2026-01-07'),
      resourceId: 'room-c',
    },
    {
      id: 3014,
      title: 'Room C Event',
      start: Temporal.PlainDate.from('2026-01-07'),
      end: Temporal.PlainDate.from('2026-01-07'),
      resourceId: 'room-c',
    },
    {
      id: 302,
      title: 'Sprint Planning',
      start: Temporal.ZonedDateTime.from('2026-01-07T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-07T11:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 303,
      title: 'Short Meeting',
      start: Temporal.ZonedDateTime.from('2026-01-07T11:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-07T12:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 304,
      title: 'Long Workshop',
      start: Temporal.ZonedDateTime.from('2026-01-07T13:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-07T18:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 305,
      title: 'Afternoon Break',
      start: Temporal.ZonedDateTime.from('2026-01-07T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-07T15:15[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 306,
      title: 'Room C Morning',
      start: Temporal.ZonedDateTime.from('2026-01-07T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-07T11:00[Europe/London]'),
      resourceId: 'room-c',
    },
    {
      id: 307,
      title: 'Room C Session',
      start: Temporal.ZonedDateTime.from('2026-01-07T13:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-07T15:00[Europe/London]'),
      resourceId: 'room-c',
    },
    
    // January 8, 2026 (Thursday)
    {
      id: 401,
      title: 'All Day Event',
      start: Temporal.PlainDate.from('2026-01-08'),
      end: Temporal.PlainDate.from('2026-01-08'),
      resourceId: 'room-a',
    },
    {
      id: 402,
      title: 'Morning Training',
      start: Temporal.ZonedDateTime.from('2026-01-08T08:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-08T10:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 403,
      title: 'Mid-Morning Session',
      start: Temporal.ZonedDateTime.from('2026-01-08T10:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-08T12:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 404,
      title: 'Project Review',
      start: Temporal.ZonedDateTime.from('2026-01-08T13:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-08T15:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 405,
      title: 'Final Presentation',
      start: Temporal.ZonedDateTime.from('2026-01-08T15:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-08T17:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 406,
      title: 'Wrap Up Meeting',
      start: Temporal.ZonedDateTime.from('2026-01-08T17:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-08T18:30[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 407,
      title: 'Room C Review',
      start: Temporal.ZonedDateTime.from('2026-01-08T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-08T12:00[Europe/London]'),
      resourceId: 'room-c',
    },
    {
      id: 408,
      title: 'Room C Planning',
      start: Temporal.ZonedDateTime.from('2026-01-08T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-08T17:00[Europe/London]'),
      resourceId: 'room-c',
    },
    
    // January 9, 2026 (Friday)
    {
      id: 501,
      title: 'Weekly Review',
      start: Temporal.ZonedDateTime.from('2026-01-09T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-09T10:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 502,
      title: 'Demo Session',
      start: Temporal.ZonedDateTime.from('2026-01-09T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-09T16:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 503,
      title: 'Room C Friday',
      start: Temporal.ZonedDateTime.from('2026-01-09T11:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-09T13:00[Europe/London]'),
      resourceId: 'room-c',
    },
    {
      id: 504,
      title: 'Room C Demo',
      start: Temporal.ZonedDateTime.from('2026-01-09T16:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-09T18:00[Europe/London]'),
      resourceId: 'room-c',
    },
    
    // January 10, 2026 (Saturday)
    {
      id: 601,
      title: 'Weekend Workshop',
      start: Temporal.ZonedDateTime.from('2026-01-10T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-10T12:00[Europe/London]'),
      resourceId: 'room-a',
    },
    
    // January 11, 2026 (Sunday)
    {
      id: 701,
      title: 'Sunday Planning',
      start: Temporal.ZonedDateTime.from('2026-01-11T11:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-11T13:00[Europe/London]'),
      resourceId: 'room-b',
    },
    
    // Overlapping events on same day/resource (Jan 5)
    {
      id: 801,
      title: 'Concurrent Event A',
      start: Temporal.ZonedDateTime.from('2026-01-05T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T15:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 802,
      title: 'Concurrent Event B',
      start: Temporal.ZonedDateTime.from('2026-01-05T14:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-01-05T15:30[Europe/London]'),
      resourceId: 'room-b',
    },
  ],
})
calendar.render(calendarElement)

// change timezone via calendarControlsPlugin
const timezoneSelect = document.getElementById('timezone-select') as HTMLSelectElement
timezoneSelect.addEventListener('change', (e) => {
  const newTimezone = (e.target as HTMLSelectElement).value
  if (newTimezone) {
    calendarControlsPlugin.setTimezone(newTimezone as IANATimezone)
  }
})

const doStuffButton = document.getElementById('do-stuff') as HTMLButtonElement
doStuffButton.addEventListener('click', (e) => {
  scrollController.scrollTo('05:00')
})