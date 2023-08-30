import { createCalendar } from '../../packages/calendar/src/factory.ts'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar(calendarElement, {})

calendar.bootstrap()
