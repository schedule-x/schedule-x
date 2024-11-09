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
  weekOptions: {
    // gridHeight: 3000,
    // nDays: 3,
    eventWidth: 95,
  },
  // monthGridOptions: {
  //   nEventsPerDay: 7
  // },
  firstDayOfWeek: 1,
  // locale: 'de-DE',
  // locale: 'pt-BR',
  // locale: 'en-US',
  // locale: 'zh-CN',
  // locale: 'id-ID',
  locale: 'sr-RS',
  // locale: 'et-EE',
  // locale: 'ca-ES',
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda()],
  // defaultView: viewWeek.name,
  // minDate: '2024-01-01',
  // maxDate: '2025-03-31',
  // defaultView: 'month-grid',
  // selectedDate: '2024-12-01',
  // datePicker: {
  //   selectedDate: '2023-11-01'
  // },
  // dayBoundaries: {
  //   start: '06:00',
  //   end: '20:00',
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
    },

    onClickAgendaDate(date) {
      console.log('onClickAgendaDate', date)
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
    //
    // isCalendarSmall($app) {
    //   return $app.elements.calendarWrapper!.clientWidth! < 500
    // }
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
      start: '2024-09-03',
      end: '2024-09-03',
      style: {
        // create tilted 5px thick gray lines
        backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
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
        backgroundColor: '#f91c45',
        opacity: 0.5,
      },
    },
    {
      title: 'Holiday',
      start: '2024-09-05',
      end: '2024-09-07',
      style: {
        backgroundImage: 'repeating-linear-gradient(45deg, #1cf9b0, #1cf9b0 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
    }
  ],
  events: [
    {
      id: 874574875,
      start: '2024-09-09 07:45',
      end: '2024-09-09 09:01',
      _customContent: {
        timeGrid: '<div class="custom-content">Custom Content</div>',
        monthGrid: '<div class="custom-content">Custom Content</div>',
      }
    },
    {
      id: 874574875,
      start: '2024-09-09',
      end: '2024-09-09',
      title: 'All Day Event',
      _customContent: {
        dateGrid: '<div class="custom-content">Custom Content</div>',
        monthAgenda: '<div class="custom-content">Custom Content</div>',
      }
    },
    ...seededEvents,
    {
      id: 45678,
      title: 'Bi-Weekly Event Monday and Wednesday',
      start: '2024-03-19 14:00',
      end: '2024-03-19 15:00',
      rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959',
    },
    {
      id: 18547854,
      title: 'Bi-Weekly Event Monday and Wednesday',
      start: '2024-02-05 14:00',
      end: '2024-02-05 15:00',
      rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959',
    },
    {
      id: 18547855,
      title: 'Weekly Event',
      start: '2024-02-03',
      end: '2024-02-03',
      rrule: 'FREQ=WEEKLY;COUNT=4',
    },
    {
      id: 789,
      title: 'Daily event',
      start: '2024-02-05 12:00',
      end: '2024-02-05 13:55',
      rrule: 'FREQ=DAILY;COUNT=5',
      calendarId: 'personal',
    },
    {
      id: 9834876578,
      title: 'Daily event 2',
      start: '2024-02-05 12:00',
      end: '2024-02-05 13:55',
      rrule: 'FREQ=DAILY;UNTIL=20240209T235900',
      calendarId: 'work',
    },
    {
      id: 7845684678465874,
      title: 'Monthly event',
      start: '2024-02-07 16:00',
      end: '2024-02-07 17:55',
      rrule: 'FREQ=MONTHLY;COUNT=5',
    },
    {
      rrule: 'FREQ=YEARLY;COUNT=5',
      title: 'Yearly event',
      start: '2024-02-08 16:00',
      end: '2024-02-08 17:55',
      id: 874367853,
    },
  ],
}, [
  createDragAndDropPlugin(),
  createCalendarControlsPlugin(),
  createScrollControllerPlugin(),
  createEventsServicePlugin(),
  createCurrentTimePlugin(),
  createEventModalPlugin(),
  createEventRecurrencePlugin(),
  createResizePlugin(),
])
calendar.render(calendarElement)

// const calendar2Element = document.getElementById('calendar-2') as HTMLElement
// const calendar2 = createCalendar({
//   views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda()],
//   events: [],
// })
// calendar2.render(calendar2Element)

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
    start: '2024-06-06',
    end: '2024-06-06',
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
