import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export type MonthAgenda = {
  date: string
  events: CalendarEventInternal[]
}

export type YearAgenda = MonthAgenda[]
