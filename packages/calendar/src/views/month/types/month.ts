import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export type MonthDay = {
  date: string
  events: Record<string, CalendarEventInternal | 'blocker' | undefined>
}

export type MonthWeek = MonthDay[]

export type Month = MonthWeek[]
