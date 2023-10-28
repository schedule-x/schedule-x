import { createCalendar } from './factory'
import { viewWeek } from './views/week'
import { viewMonthGrid } from './views/month-grid'
import { viewDay } from './views/day'
import { CalendarConfigExternal as CalendarConfig } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'

export type { CalendarConfig }
export { createCalendar, viewWeek, viewMonthGrid, viewDay }
