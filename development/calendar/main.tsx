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
import '../app.css'
import { createEventModalPlugin } from '@schedule-x/event-modal/src'
import { seededEvents } from '../data/seeded-events.ts'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller/src'
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
import { mergeLocales } from '@schedule-x/translations/src/utils/merge-locales.ts'
import { translations } from '@schedule-x/translations/src'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb.ts'
import '../../packages/timezone-select/src/timezone-select.scss'

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
    createEventModalPlugin(),
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
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda(), createViewList()],
  defaultView: 'week',
  
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
    eventOverlap: false,
  },
  locale: 'en-US',

  // tz new york
  timezone: 'Europe/London',
  events: [

    // --- BUG REPRO: 4-event cascade (simplest case) ---
    // Each event overlaps the next, but non-adjacent events DON'T overlap.
    // B and C both compute _previousConcurrentEvents=1, _totalConcurrentEvents=3,
    // so both get left=33%. During 10:00-10:30, B and C occupy the same position
    // and one is completely hidden behind the other.
    {
      id: 901,
      title: 'Meeting A',
      start: Temporal.ZonedDateTime.from('2026-03-03T08:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T09:30[Europe/London]'),
      calendarId: 'personal',
    },
    {
      id: 902,
      title: 'Meeting B (HIDDEN)',
      start: Temporal.ZonedDateTime.from('2026-03-03T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T10:30[Europe/London]'),
      calendarId: 'work',
    },
    {
      id: 903,
      title: 'Meeting C (HIDES B)',
      start: Temporal.ZonedDateTime.from('2026-03-03T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T11:30[Europe/London]'),
      calendarId: 'school',
    },
    {
      id: 904,
      title: 'Meeting D',
      start: Temporal.ZonedDateTime.from('2026-03-03T11:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T12:30[Europe/London]'),
      calendarId: 'leisure',
    },

    // --- BUG REPRO: 6-event cascade (worse — 4 events stacked at same offset) ---
    // E, F, G, H all compute prev=1, total=3 → left=33%.
    // During overlapping windows, multiple events are completely hidden.
    {
      id: 905,
      title: 'Chain E',
      start: Temporal.ZonedDateTime.from('2026-03-03T13:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T14:30[Europe/London]'),
      calendarId: 'personal',
    },
    {
      id: 906,
      title: 'Chain F (hidden)',
      start: Temporal.ZonedDateTime.from('2026-03-03T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T15:30[Europe/London]'),
      calendarId: 'work',
    },
    {
      id: 907,
      title: 'Chain G (hidden)',
      start: Temporal.ZonedDateTime.from('2026-03-03T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T16:30[Europe/London]'),
      calendarId: 'school',
    },
    {
      id: 908,
      title: 'Chain H (hidden)',
      start: Temporal.ZonedDateTime.from('2026-03-03T16:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T17:30[Europe/London]'),
      calendarId: 'leisure',
    },
    {
      id: 909,
      title: 'Chain I (hidden)',
      start: Temporal.ZonedDateTime.from('2026-03-03T17:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T18:30[Europe/London]'),
      calendarId: 'personal',
    },
    {
      id: 910,
      title: 'Chain J',
      start: Temporal.ZonedDateTime.from('2026-03-03T18:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-03T19:30[Europe/London]'),
      calendarId: 'work',
    },


    // bug repro: 4 events, no overlap
    {
      id: 911,
      title: 'Event 14:00-15:30',
      start: Temporal.ZonedDateTime.from('2026-03-09T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-09T15:30[Europe/London]'),
      calendarId: 'personal',
    },
    {
      id: 912,
      title: 'Event 14:00-14:50',
      start: Temporal.ZonedDateTime.from('2026-03-09T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-09T14:50[Europe/London]'),
      calendarId: 'work',
    },
    {
      id: 913,
      title: 'Event 14:30-15:30',
      start: Temporal.ZonedDateTime.from('2026-03-09T14:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-09T15:30[Europe/London]'),
      calendarId: 'work',
    },
    {
      id: 914,
      title: 'Event 15:00-16:00',
      start: Temporal.ZonedDateTime.from('2026-03-09T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-09T16:00[Europe/London]'),
      calendarId: 'work',
    },
    {
      id: 915,
      title: 'Event 15:00-16:00',
      start: Temporal.ZonedDateTime.from('2026-03-09T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2026-03-09T16:00[Europe/London]'),
      calendarId: 'work',
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