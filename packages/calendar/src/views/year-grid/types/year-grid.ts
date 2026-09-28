import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export type YearGridDay = {
  date: Temporal.PlainDate
  events: CalendarEventInternal[]
}

export type YearGridMonth = {
  date: Temporal.PlainDate
  leadingDays: number
  days: YearGridDay[]
}

export type YearGrid = YearGridMonth[]
