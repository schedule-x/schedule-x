import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { Temporal } from 'temporal-polyfill'

export type MonthDay = {
  date: Temporal.ZonedDateTime
  events: Record<string, CalendarEventInternal | 'blocker' | undefined>
  backgroundEvents: BackgroundEvent[]
}

export type MonthWeek = MonthDay[]

export type Month = MonthWeek[]
