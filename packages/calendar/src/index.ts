import { createCalendar } from './factory'
import { viewWeek } from './views/week'
import { viewMonthGrid } from './views/month-grid'
import { viewDay } from './views/day'
import { viewMonthAgenda } from './views/month-agenda'
import {
  CalendarConfigExternal as CalendarConfig,
  CustomComponentFn,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarApp from './calendar.app'
import { createPreactView } from './utils/stateful/preact-view/preact-view'

export type { CalendarConfig, CustomComponentFn }

export {
  createCalendar,
  viewWeek,
  viewMonthGrid,
  viewDay,
  viewMonthAgenda,
  CalendarApp,
  createPreactView,
}
