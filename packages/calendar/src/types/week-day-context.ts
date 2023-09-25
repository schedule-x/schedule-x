import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import { DATE_GRID_BLOCKER } from '../constants'

type WeekDayContext = {
  date: string
  timeGridEvents: CalendarEventInternal[]
  dateGridEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
}

export type WeekDayContexts = Record<string, WeekDayContext>
