import CalendarAppSingleton from './interfaces/calendar/calendar-app-singleton'
import type CalendarEvent from './interfaces/calendar/calendar-event.interface'
import type { CalendarEventInternal } from './interfaces/calendar/calendar-event.interface'
import type EventModalPlugin from './interfaces/event-modal/event-modal.plugin'

export type { CalendarConfigExternal } from './interfaces/calendar/calendar-config'
export type { CalendarEvent, EventModalPlugin, CalendarEventInternal }
export type { View, ViewConfig } from './types/calendar/view'
export type { CalendarAppSingleton }
export type { CustomComponentFns as CustomComponents } from './interfaces/calendar/custom-component-fns'
export {
  addDays,
  addMonths,
  addMinutes,
} from './utils/stateless/time/date-time-mutation/adding'
