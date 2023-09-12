import { CalendarEventInternal } from '../utils/stateful/calendar-event/calendar-event.interface'

export type WeekDayContext = {
  date: string
  calendarEvents: CalendarEventInternal[]
}

export type WeekDayContexts = Record<string, WeekDayContext>
