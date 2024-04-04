import CalendarEventExternal from './calendar-event.interface'
import { DateRange } from '../../types/date-range'

export interface CalendarCallbacks {
  onEventUpdate?: (event: CalendarEventExternal) => void
  onEventClick?: (event: CalendarEventExternal) => void
  onRangeUpdate?: (range: DateRange) => void
  onClickDate?: (date: string) => void
  onClickDateTime?: (dateTime: string) => void
  onAddTimeOff?: () => void
  onChangeToAppointments?: () => void
  onToggleSidePanel?: (isOpen: boolean) => void
}
