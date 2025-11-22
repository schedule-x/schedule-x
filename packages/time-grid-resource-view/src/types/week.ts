import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

const DATE_GRID_BLOCKER = Symbol('DATE_GRID_BLOCKER')

type WeekDay = {
  date: string
  timeGridEvents: CalendarEventInternal[]
  dateGridEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
  backgroundEvents: BackgroundEvent[]
}

export type Week = Record<string, WeekDay>
export { DATE_GRID_BLOCKER }
