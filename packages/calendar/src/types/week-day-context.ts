import { CalendarEventInternal } from '../utils/stateful/calendar-event/calendar-event.interface'

type WeekDayContext = {
  date: string
  timeGridEvents: CalendarEventInternal[]
  dateGridEvents: (CalendarEventInternal | null | 'blocker')[]
}

export type WeekDayContexts = Record<string, WeekDayContext>
