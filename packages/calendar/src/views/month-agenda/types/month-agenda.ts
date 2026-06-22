import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export type AgendaDay = {
  date: Temporal.PlainDate
  events: CalendarEventInternal[]
}

export type AgendaWeek = AgendaDay[]

export type Agenda = {
  weeks: AgendaWeek[]
}

export type MonthAgendaDay = AgendaDay
export type MonthAgendaWeek = AgendaWeek
export type MonthAgenda = Agenda
