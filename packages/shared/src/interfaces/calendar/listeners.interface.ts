import CalendarEventExternal from './calendar-event.interface'
import { DateRange } from '../../types/date-range'

export interface CalendarCallbacks {
  onEventUpdate?: (event: CalendarEventExternal) => void
  onEventClick?: (event: CalendarEventExternal) => void
  onRangeUpdate?: (range: DateRange) => void
}
