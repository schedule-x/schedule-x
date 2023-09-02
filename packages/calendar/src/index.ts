import { createCalendar } from './factory'
import { viewWeek } from './views/week'
import { viewMonth } from './views/month'
import { viewDay } from './views/day'
import { CalendarConfigExternal as CalendarConfig } from './utils/stateful/config/calendar-config'

export type { CalendarConfig }
export { createCalendar, viewWeek, viewMonth, viewDay }
