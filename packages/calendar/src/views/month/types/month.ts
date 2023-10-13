import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export type MonthDay = {
  date: string
  events: Record<string, CalendarEventInternal>
}

export type MonthWeek = Record<string, MonthDay>

export type Month = MonthWeek[]
