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

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  firstDayOfWeek: 0,
  // locale: 'de-DE',
  locale: 'en-US',
  // locale: 'zh-CN',
  views: [viewMonthGrid, viewWeek, viewDay, viewMonthAgenda],
  defaultView: viewWeek.name,
  // datePicker: {
  //   selectedDate: '2023-11-01'
  // },
  dayBoundaries: {
    start: '06:00',
    end: '03:00',
  },
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
  plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
  events: seededEvents,
})

calendar.render(calendarElement)

let darkToggle = 0

const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement
themeToggle.addEventListener('click', () => {
  calendar.setTheme(darkToggle === 0 ? 'light' : 'dark')
  darkToggle === 0 ? darkToggle++ : darkToggle--
})

const addEventButton = document.getElementById('add-event') as HTMLInputElement
addEventButton.addEventListener('click', () => {
  calendar.events.add({
    id: 'new-event',
    title: 'New Event',
    start: '2023-12-18',
    end: '2023-12-19',
  })
})
