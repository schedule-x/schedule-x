import { createCalendar } from './factory'
import { viewWeek, createViewWeek } from './views/week'
import { viewMonthGrid, createViewMonthGrid } from './views/month-grid'
import { viewDay, createViewDay } from './views/day'
import { viewMonthAgenda, createViewMonthAgenda } from './views/month-agenda'
import {
  CalendarConfigExternal as CalendarConfig,
  CustomComponentFn,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import {
  CalendarEvent,
  toDateString,
  toTimeString,
  toDateTimeString,
  toJSDate,
} from '@schedule-x/shared/src'
import CalendarApp from './calendar.app'
import { createPreactView } from './utils/stateful/preact-view/preact-view'
import {
  setRangeForWeek,
  setRangeForMonth,
  setRangeForDay,
} from './utils/stateless/time/range/set-range'
import { externalEventToInternal } from '@schedule-x/shared/src/utils/stateless/calendar/external-event-to-internal'
export type { CalendarConfig, CustomComponentFn, CalendarEvent }

export {
  createCalendar,
  viewWeek,
  viewMonthGrid,
  viewDay,
  viewMonthAgenda,
  CalendarApp,
  toDateString,
  toTimeString,
  toDateTimeString,
  toJSDate,
  createPreactView,
  setRangeForDay,
  setRangeForWeek,
  setRangeForMonth,
  externalEventToInternal,
  createViewWeek,
  createViewMonthGrid,
  createViewDay,
  createViewMonthAgenda,
}
