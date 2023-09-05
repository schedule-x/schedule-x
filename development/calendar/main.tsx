import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
  viewWeek,
  viewMonth,
  viewDay,
} from '../../packages/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar(calendarElement, {
  locale: 'de-DE',
  // locale: 'zh-CN',
  views: [viewMonth, viewWeek, viewDay],
  defaultView: 'week',
  // dayBoundaries: {
  //   start: '08:30',
  //   end: '18:00',
  // }
})

calendar.bootstrap()
