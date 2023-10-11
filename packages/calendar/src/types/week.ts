import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DATE_GRID_BLOCKER } from '../constants'

type WeekDay = {
  date: string
  timeGridEvents: CalendarEventInternal[]
  dateGridEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
}

export type Week = Record<string, WeekDay>
