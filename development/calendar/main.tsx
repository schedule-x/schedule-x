/* eslint-disable max-lines */
import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
  viewWeek,
  viewMonthGrid,
  viewDay,
  viewMonthAgenda,
} from '@schedule-x/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop/src'
import { createEventModalPlugin } from '@schedule-x/event-modal/src'
import { seededEvents } from '../data/seeded-events.ts'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller/src'
import { createEventRecurrencePlugin } from '@schedule-x/event-recurrence/src'
import { RRValues } from '../../packages/event-recurrence/src'
import { createResizePlugin } from '../../packages/resize/src'

const calendarElement = document.getElementById('calendar') as HTMLElement

const scrollControllerPlugin = createScrollControllerPlugin({
  initialScroll: '07:50'
})
const calendar = createCalendar({
  // weekOptions: {
  //   gridHeight: 2500,
  // },
  // firstDayOfWeek: 1,
  // locale: 'ja-JP',
  // locale: 'en-US',
  // locale: 'zh-CN',
  views: [viewMonthGrid, viewWeek, viewDay, viewMonthAgenda],
  defaultView: viewWeek.name,
  // selectedDate: '2024-02-01',
  // datePicker: {
  //   selectedDate: '2023-11-01'
  // },
  // dayBoundaries: {
  //   start: '21:00',
  //   end: '18:00',
  // },
  // isDark: true,
  callbacks: {
    onRangeUpdate(range) {
      console.log('onRangeUpdate', range)
    },

    onEventUpdate(event) {
      console.log('onEventUpdate', event)
    },

    onEventClick(event) {
      console.log('onEventClick', event)
    },

    onClickDate(date) {
      console.log('onClickDate', date)
    },

    onClickDateTime(dateTime) {
      console.log('onClickDateTime', dateTime)
    }
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
  plugins: [
    createDragAndDropPlugin(),
    createEventModalPlugin(),
    scrollControllerPlugin,
    createEventRecurrencePlugin(),
    createResizePlugin(),
  ],
  events: [
    ...seededEvents
  ],
})
calendar.render(calendarElement)

let darkToggle = 0

const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement
themeToggle.addEventListener('click', () => {
  calendar.setTheme(darkToggle === 0 ? 'light' : 'dark')
  darkToggle === 0 ? darkToggle++ : darkToggle--
})

const addEventButton = document.getElementById('add-event') as HTMLButtonElement
addEventButton.addEventListener('click', () => {
  calendar.events.add({
    id: 'new-event',
    title: 'New Event',
    start: '2023-12-18',
    end: '2023-12-19',
  })
})

const scrollButton = document.getElementById('scroll') as HTMLButtonElement
scrollButton.addEventListener('click', () => {
  scrollControllerPlugin.scrollTo((document.getElementById('scroll-to') as HTMLInputElement).value)
})

const logAllEventsButton = document.getElementById('log-all-events') as HTMLButtonElement
logAllEventsButton.addEventListener('click', () => {
  console.log(calendar.events.getAll())
})

