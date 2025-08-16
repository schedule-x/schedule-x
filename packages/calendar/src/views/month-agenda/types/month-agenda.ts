import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export type MonthAgendaDay = {
  date: Temporal.PlainDate
  events: CalendarEventInternal[]
}

export type MonthAgendaWeek = MonthAgendaDay[]

export type MonthAgenda = {
  weeks: MonthAgendaWeek[]
}
