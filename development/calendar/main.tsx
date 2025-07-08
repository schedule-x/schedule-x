/* eslint-disable max-lines */
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
import { createCurrentTimePlugin } from '../../packages/current-time/src/current-time-plugin.impl.ts'
import { createViewMonthGrid } from '@schedule-x/calendar/src/views/month-grid'
import { createViewWeek } from '@schedule-x/calendar/src/views/week'
import { createViewDay } from '@schedule-x/calendar/src/views/day'
import { createViewMonthAgenda } from '@schedule-x/calendar/src/views/month-agenda'
import { createViewList } from '@schedule-x/calendar/src/views/list'
import { mergeLocales } from '@schedule-x/translations/src/utils/merge-locales.ts'
import { translations } from '@schedule-x/translations/src'

const calendarElement = document.getElementById('calendar') as HTMLElement

const eventsServicePlugin = createEventsServicePlugin()

const calendar = createCalendar({
plugins: [
  createEventRecurrencePlugin(),
  eventsServicePlugin,
  createDragAndDropPlugin(),
  createEventModalPlugin(),
  createResizePlugin(),
],

  translations: mergeLocales(
    translations,
    {
      enUS: {}
    }
  ),
  weekOptions: {
    eventWidth: 95,
  },
  firstDayOfWeek: 1,
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda(), createViewList()],
  defaultView: 'week',
  callbacks: {
    onScrollDayIntoView(date) {
      console.log('onScrollDayIntoView: ', date)
    },

    onEventUpdate(event) {
      console.log('onEventUpdate', event)
    },

    async onBeforeEventUpdateAsync(oldEvent, newEvent, $app) {
        return Promise.resolve(true)
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
      console.log('onClickDateTime', dateTime)
    },

    onClickAgendaDate(date) {
      console.log('onClickAgendaDate', date)
    },

    onDoubleClickAgendaDate(date) {
      console.log('onDoubleClickAgendaDate', date)
    },

    onClickPlusEvents(date) {
      console.log('onClickPlusEvents', date)
    },

    onSelectedDateUpdate(date) {
      console.log('onSelectedDateUpdate', date)
    },

    onDoubleClickDateTime(dateTime) {
      console.log('onDoubleClickDateTime', dateTime)
    },

    onDoubleClickDate(date) {
      console.log('onDoubleClickDate', date)
    },

    onRangeUpdate(range) {
      console.log('onRangeUpdate', range)
    }
  },
  selectedDate: '2025-07-10',
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
  backgroundEvents: [
    {
      title: 'Out of office',
      start: '2025-07-07 00:00',
      end: '2025-07-07 02:00',
      style: {
        // create tilted 5px thick gray lines
        backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
      rrule: 'FREQ=WEEKLY',
      exdate: ['20250714T000000', '20250728T000000']
    },
  ],
  /* dayBoundaries: {
    start: '10:00',
    end: '23:00'
  }, */
  locale: 'de-DE',
  events: [
    ...seededEvents
  ],
})
calendar.render(calendarElement)
