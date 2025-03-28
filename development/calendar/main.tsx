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
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { createCurrentTimePlugin } from '../../packages/current-time/src/current-time-plugin.impl.ts'
import { createViewMonthGrid } from '@schedule-x/calendar/src/views/month-grid'
import { createViewWeek } from '@schedule-x/calendar/src/views/week'
import { createViewDay } from '@schedule-x/calendar/src/views/day'
import { createViewMonthAgenda } from '@schedule-x/calendar/src/views/month-agenda'
import {WeekDay} from "@schedule-x/shared/src/enums/time/week-day.enum.ts";
import { mergeLocales } from '@schedule-x/translations/src/utils/merge-locales.ts'
import { translations } from '@schedule-x/translations/src'

const calendarElement = document.getElementById('calendar') as HTMLElement

const scrollControllerPlugin = createScrollControllerPlugin({
  initialScroll: '07:50',
})

class CalendarsUpdaterPlugin {
  name: string = 'calendars-updater'
  $app!: CalendarAppSingleton

  destroy(): void {}

  init($app: CalendarAppSingleton): void {
    this.$app = $app
  }

  updateCalendars(): void {
    this.$app.config.calendars.value = {
      ...this.$app.config.calendars.value,
      personal: {
        colorName: 'personal',
        lightColors: {
          main: 'yellow',
          container: '#000',
          onContainer: 'yellow',
        },
        darkColors: {
          main: '#fff5c0',
          onContainer: '#fff5de',
          container: '#a29742',
        },
      },
    }
  }
}
const calendarsUpdaterPlugin = new CalendarsUpdaterPlugin()

const calendarControlsPlugin = createCalendarControlsPlugin()
const eventsServicePlugin = createEventsServicePlugin()

const calendar = createCalendar({
  translations: mergeLocales(
    translations,
    {
      enUS: {}
    }
  ),
  weekOptions: {
    eventWidth: 95,
  },
  showWeekNumbers: true,
  firstDayOfWeek: 6,
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda()],
  defaultView: 'week',
  // locale: 'zh-CN',
  callbacks: {
    onEventUpdate(event) {
      console.log('onEventUpdate', event)
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
  },
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
      start: '2025-02-11',
      end: '2025-02-11',
      style: {
        // create tilted 5px thick gray lines
        backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
      rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH;',
    },
    {
      title: 'Out of office',
      start: '2024-12-03',
      end: '2024-12-03',
      style: {
        // create tilted 5px thick gray lines
        backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
    },
    {
      title: 'Out of office',
      start: '2024-12-02 00:00',
      end: '2024-12-02 02:00',
      style: {
        background: 'linear-gradient(45deg, #f91c45, #1c7df9)',
        opacity: 0.5,
      },
    },
    {
      title: 'Out of office',
      start: '2024-12-02 04:00',
      end: '2024-12-02 07:00',
      style: {
        backgroundColor: '#f91c45',
        opacity: 0.5,
      },
    },
    {
      title: 'Holiday',
      start: '2024-12-05',
      end: '2024-12-07',
      style: {
        backgroundImage: 'repeating-linear-gradient(45deg, #1cf9b0, #1cf9b0 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
    }
  ],
  dayBoundaries: {
    start: '10:00',
    end: '23:00'
  },
  events: [
    {
      id: 1,
      start: '2025-03-04 08:00',
      end: '2025-03-04 12:00',
    },
    {
      id: 2,
      start: '2025-03-04 11:00',
      end: '2025-03-04 12:00',
    },
    // ...seededEvents
  ],
}, [
  eventsServicePlugin,
  createDragAndDropPlugin(),
  createCalendarControlsPlugin(),
  createScrollControllerPlugin(),
  createCurrentTimePlugin(),
  createEventModalPlugin(),
  createEventRecurrencePlugin(),
  createResizePlugin(),
])
calendar.render(calendarElement)

let darkToggle = 0

const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement
themeToggle.addEventListener('click', () => {
  calendar.setTheme(darkToggle % 2 === 0 ? 'dark' : 'light')
  darkToggle++
})

const addEventButton = document.getElementById('add-event') as HTMLButtonElement
addEventButton.addEventListener('click', () => {
  eventsServicePlugin.add({
    id: 'new-event',
    title: 'New Event',
    start: '2025-03-26 11:00',
    end: '2025-03-26 12:00',
  })
})

const scrollButton = document.getElementById('scroll') as HTMLButtonElement
scrollButton.addEventListener('click', () => {
  scrollControllerPlugin.scrollTo(
    (document.getElementById('scroll-to') as HTMLInputElement).value
  )
})

const logAllEventsButton = document.getElementById(
  'log-all-events'
) as HTMLButtonElement
logAllEventsButton.addEventListener('click', () => {
  console.log(calendar.events.getAll())
})

const setDateButton = document.getElementById(
  'set-date-button'
) as HTMLButtonElement
setDateButton.addEventListener('click', () => {
  const newDate = (document.getElementById('set-date') as HTMLInputElement)
    .value
  calendarControlsPlugin.setDate(newDate)
})

const setViewButton = document.getElementById(
  'set-view-button'
) as HTMLButtonElement
setViewButton.addEventListener('click', () => {
  const newView = (document.getElementById('set-view') as HTMLInputElement)
    .value
  calendarControlsPlugin.setView(newView)
})

const setFirstDayOfWeekButton = document.getElementById(
    'set-first-day-of-week-button'
) as HTMLButtonElement
setFirstDayOfWeekButton.addEventListener('click', () => {
  const newFirstDayOfWeek = (document.getElementById('set-first-day-of-week') as HTMLInputElement)
      .value
  calendarControlsPlugin.setFirstDayOfWeek(parseInt(newFirstDayOfWeek, 10) as WeekDay)
})

const setNDaysButton = document.getElementById(
    'set-n-days-button'
) as HTMLButtonElement
setNDaysButton.addEventListener('click', () => {
  const newNDays = (document.getElementById('set-n-days') as HTMLInputElement)
      .value as unknown as number
  calendarControlsPlugin.setWeekOptions({...calendarControlsPlugin.getWeekOptions(), nDays: newNDays})
})

const setLocaleSelect = document.getElementById(
    'set-locale'
) as HTMLSelectElement
setLocaleSelect.addEventListener('change', () => {
  const newLocale = (document.getElementById('set-locale') as HTMLSelectElement).value
  calendarControlsPlugin.setLocale(newLocale)
})

const setDayBoundariesButton = document.getElementById(
    'set-day-boundaries-button'
) as HTMLButtonElement

setDayBoundariesButton.addEventListener('click', () => {
  const newDayBoundariesStart = (document.getElementById('set-day-boundaries-start') as HTMLInputElement).value
  const newDayBoundariesEnd = (document.getElementById('set-day-boundaries-end') as HTMLInputElement).value

  calendarControlsPlugin.setDayBoundaries({start: `${newDayBoundariesStart.padStart(2, '0')}:00`, end: `${newDayBoundariesEnd.padStart(2, '0')}:00`})
})

const updateCalendarsButton = document.getElementById(
  'update-calendars'
) as HTMLButtonElement
updateCalendarsButton.addEventListener('click', () => {
  calendarsUpdaterPlugin.updateCalendars()
})

const updateBackgroundEventsButton = document.getElementById(
  'update-background-events'
) as HTMLButtonElement
updateBackgroundEventsButton.addEventListener('click', () => {
  eventsServicePlugin.setBackgroundEvents([
    {
      title: 'Out of office',
      start: '2024-09-03',
      end: '2024-09-03',
      style: {
        backgroundColor: '#1c39f9',
        opacity: 0.5,
      },
    },
    {
      title: 'Out of office',
      start: '2024-09-02 00:00',
      end: '2024-09-02 02:00',
      style: {
        background: 'linear-gradient(45deg, #f91c45, #1c7df9)',
        opacity: 0.5,
      },
    },
    {
      title: 'Out of office',
      start: '2024-09-02 04:00',
      end: '2024-09-02 07:00',
      style: {
        backgroundColor: '#f9ba1c',
        opacity: 0.5,
      },
    },
    {
      title: 'Holiday',
      start: '2024-09-05',
      end: '2024-09-07',
      style: {
        backgroundColor: '#f9501c',
        opacity: 0.5,
      },
    }
  ])
})
