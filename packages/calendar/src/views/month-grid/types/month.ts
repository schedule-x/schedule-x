import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

export type MonthDay = {
  date: Temporal.PlainDate
  events: Record<string, CalendarEventInternal | 'blocker' | undefined>
  backgroundEvents: BackgroundEvent[]
}

export type MonthWeek = MonthDay[]

export type Month = MonthWeek[]
