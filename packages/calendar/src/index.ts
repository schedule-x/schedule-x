import { createCalendar } from './factory'
import { viewWeek } from './views/week'
import { viewMonthGrid } from './views/month-grid'
import { viewDay } from './views/day'
import { viewMonthAgenda } from './views/month-agenda'
import {
  CalendarConfigExternal as CalendarConfig,
  CustomComponentFn,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { CalendarEvent } from '@schedule-x/shared/src'
import CalendarApp from './calendar.app'
import {
  PreactViewComponent,
  createPreactView,
} from './utils/stateful/preact-view/preact-view'
import {
  setRangeForWeek,
  setRangeForMonth,
  setRangeForDay,
} from './utils/stateless/time/range/set-range'

export type {
  CalendarConfig,
  CustomComponentFn,
  CalendarEvent,
  PreactViewComponent,
}

export {
  createCalendar,
  viewWeek,
  viewMonthGrid,
  viewDay,
  viewMonthAgenda,
  CalendarApp,
  createPreactView,
  setRangeForDay,
  setRangeForWeek,
  setRangeForMonth,
}
