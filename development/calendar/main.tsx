import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import { createCalendar, viewWeek } from '../../packages/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'
import { monthView } from '@schedule-x/calendar/src/views/month'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar(calendarElement, {
  locale: 'de-DE',
  views: [viewWeek, monthView],
})

calendar.bootstrap()
