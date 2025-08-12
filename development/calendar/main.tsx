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
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda(), createViewList()],
  defaultView: 'week',
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
  minDate: Temporal.PlainDate.from('2023-08-01'),
  maxDate: Temporal.PlainDate.from('2028-08-01'),
  dayBoundaries: {
    start: '06:00',
    end: '03:00',
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
  locale: 'zh-CN',

  // tz new york
  timezone: 'Europe/Berlin',
  events: [
    ...seededEvents.map(event => ({
      ...event,
      start: dateStringRegex.test(event.start) ? Temporal.PlainDate.from(event.start) : Temporal.ZonedDateTime.from(event.start),
      end: dateStringRegex.test(event.end) ? Temporal.PlainDate.from(event.end) : Temporal.ZonedDateTime.from(event.end),
    })),
/*     {
      id: 1,
      title: 'weekly',
      start: Temporal.PlainDate.from('2025-08-08'),
      end: Temporal.PlainDate.from('2025-08-08'),
      rrule: 'FREQ=WEEKLY;COUNT=10;BYDAY=MO,TU,WE,TH,FR',
    } */
      {
        id: 123,
        title: 'monthly',
        start: Temporal.ZonedDateTime.from('2025-08-11T14:00+02:00[Europe/Berlin]'),
        end: Temporal.ZonedDateTime.from('2025-08-12T15:00+02:00[Europe/Berlin]'),
      }
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