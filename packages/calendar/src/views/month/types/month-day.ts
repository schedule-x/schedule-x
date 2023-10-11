import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

type MonthDay = {
  date: string
  events: CalendarEventInternal[]
}

type MonthWeek = Record<string, MonthDay>

export type Month = MonthWeek[]
