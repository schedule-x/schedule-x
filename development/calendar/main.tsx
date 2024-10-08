/* eslint-disable max-lines */
import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {createCalendar,} from '@schedule-x/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'
import {createScrollControllerPlugin} from '@schedule-x/scroll-controller/src'
import {createEventsServicePlugin,} from '@schedule-x/event-recurrence/src'
import {createCalendarControlsPlugin} from '../../packages/calendar-controls/src'
import {CalendarAppSingleton} from '@schedule-x/shared/src'
import {createViewMonthGrid} from '@schedule-x/calendar/src/views/month-grid'
import {createViewWeek} from '@schedule-x/calendar/src/views/week'
import {createViewDay} from '@schedule-x/calendar/src/views/day'
import {createViewMonthAgenda} from '@schedule-x/calendar/src/views/month-agenda'
import {WeekDay} from "@schedule-x/shared/src/enums/time/week-day.enum.ts";
import {createIcalendarPlugin} from "@schedule-x/ical/src";

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
const icalendarPlugin = createIcalendarPlugin({
  data:
    "BEGIN:VCALENDAR\n" +
    "PRODID:-//Google Inc//Google Calendar 70.9054//EN\n" +
    "VERSION:2.0\n" +
    "CALSCALE:GREGORIAN\n" +
    "METHOD:PUBLISH\n" +
    "X-WR-CALNAME:Test ICS\n" +
    "X-WR-TIMEZONE:America/Toronto\n" +
    "BEGIN:VEVENT\n" +
    "DTSTART;VALUE=DATE:20241025\n" +
    "DTEND;VALUE=DATE:20241026\n" +
    "DTSTAMP:20241007T123831Z\n" +
    "ORGANIZER;CN=4c1a3b795346d897c8781a0df30cde8a2fc054d2fed1daa16e2ddfe5ec8b59\n" +
    " 0f@group.calendar.google.com:mailto:4c1a3b795346d897c8781a0df30cde8a2fc054d\n" +
    " 2fed1daa16e2ddfe5ec8b590f@group.calendar.google.com\n" +
    "UID:2k29n7a4iimvdaoi54jv42s5mu@google.com\n" +
    "CREATED:20241007T123804Z\n" +
    'DESCRIPTION:More Info: <a href="https://www.google.com/url?q=https://www.in\n' +
    " stagram.com/p/C9cl6SGA04s/&amp;sa=D&amp;source=calendar&amp;usd=2&amp;u\n" +
    ' sg=AOvVaw042wfimCgCk3ioqphPZ0jF" target="_blank">https://www.instagram.com/\n' +
    " p/C9cl6SGA04s/</a>\n" +
    "LAST-MODIFIED:20241007T123804Z\n" +
    "LOCATION:EVO Kitchen & Bar, 31 Water St S, Cambridge, ON N1R 3C7, Canad\n" +
    " a\n" +
    "SEQUENCE:0\n" +
    "STATUS:CONFIRMED\n" +
    "SUMMARY:Feel Soul GOOD\n" +
    "TRANSP:TRANSPARENT\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR\n"
});
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
  // locale: 'ja-JP',
  // locale: 'en-US',
  // locale: 'zh-CN',
  // locale: 'id-ID',
  // locale: 'cs-CZ',
  // locale: 'et-EE',
  // locale: 'ca-ES',
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda()],
  // defaultView: viewWeek.name,
  // minDate: '2024-01-01',
  // maxDate: '2024-03-31',
  // defaultView: 'week',
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
    beforeRender($app) {
      console.log('beforeRender', $app)
    },

    onRender($app) {
      console.log('onRender', $app)
    },

    onRangeUpdate(range) {
      icalendarPlugin.between(range.start, range.end)
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
  // events: [
  //   {
  //     id: 874574875,
  //     start: '2024-09-09 07:45',
  //     end: '2024-09-09 09:01',
  //     _customContent: {
  //       timeGrid: '<div class="custom-content">Custom Content</div>',
  //       monthGrid: '<div class="custom-content">Custom Content</div>',
  //     }
  //   },
  //   {
  //     id: 874574875,
  //     start: '2024-09-09',
  //     end: '2024-09-09',
  //     title: 'All Day Event',
  //     _customContent: {
  //       dateGrid: '<div class="custom-content">Custom Content</div>',
  //       monthAgenda: '<div class="custom-content">Custom Content</div>',
  //     }
  //   },
  //   ...seededEvents,
  //   {
  //     id: 45678,
  //     title: 'Bi-Weekly Event Monday and Wednesday',
  //     start: '2024-03-19 14:00',
  //     end: '2024-03-19 15:00',
  //     rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959',
  //   },
  //   {
  //     id: 18547854,
  //     title: 'Bi-Weekly Event Monday and Wednesday',
  //     start: '2024-02-05 14:00',
  //     end: '2024-02-05 15:00',
  //     rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959',
  //   },
  //   {
  //     id: 18547855,
  //     title: 'Weekly Event',
  //     start: '2024-02-03',
  //     end: '2024-02-03',
  //     rrule: 'FREQ=WEEKLY;COUNT=4',
  //   },
  //   {
  //     id: 789,
  //     title: 'Daily event',
  //     start: '2024-02-05 12:00',
  //     end: '2024-02-05 13:55',
  //     rrule: 'FREQ=DAILY;COUNT=5',
  //     calendarId: 'personal',
  //   },
  //   {
  //     id: 9834876578,
  //     title: 'Daily event 2',
  //     start: '2024-02-05 12:00',
  //     end: '2024-02-05 13:55',
  //     rrule: 'FREQ=DAILY;UNTIL=20240209T235900',
  //     calendarId: 'work',
  //   },
  //   {
  //     id: 7845684678465874,
  //     title: 'Monthly event',
  //     start: '2024-02-07 16:00',
  //     end: '2024-02-07 17:55',
  //     rrule: 'FREQ=MONTHLY;COUNT=5',
  //   },
  //   {
  //     rrule: 'FREQ=YEARLY;COUNT=5',
  //     title: 'Yearly event',
  //     start: '2024-02-08 16:00',
  //     end: '2024-02-08 17:55',
  //     id: 874367853,
  //   },
  // ],
}, [
  icalendarPlugin
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
