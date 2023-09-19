import { CalendarEventInternal } from '../utils/stateful/calendar-event/calendar-event.interface'
import { DATE_GRID_BLOCKER } from '../constants'

type WeekDayContext = {
  date: string
  timeGridEvents: CalendarEventInternal[]
  dateGridEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
}

export type WeekDayContexts = Record<string, WeekDayContext>
