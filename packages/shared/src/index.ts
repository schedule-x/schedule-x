import CalendarAppSingleton from './interfaces/calendar/calendar-app-singleton'

export type { View, ViewConfig } from './types/calendar/view'
export type { CalendarAppSingleton }
export {
  addDays,
  addMonths,
} from './utils/stateless/time/date-time-mutation/adding'
