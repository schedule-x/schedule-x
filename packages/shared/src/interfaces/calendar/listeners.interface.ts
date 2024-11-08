import CalendarEventExternal from './calendar-event.interface'
import { DateRange } from '../../types/date-range'
import CalendarAppSingleton from './calendar-app-singleton'

export interface CalendarCallbacks {
  onEventUpdate?: (event: CalendarEventExternal) => void
  onEventClick?: (event: CalendarEventExternal) => void
  onDoubleClickEvent?: (event: CalendarEventExternal) => void
  onRangeUpdate?: (range: DateRange) => void
  onSelectedDateUpdate?: (date: string) => void
  onClickDate?: (date: string) => void
  onDoubleClickDate?: (date: string) => void
  onClickDateTime?: (dateTime: string) => void
  onDoubleClickDateTime?: (dateTime: string) => void
  onClickAgendaDate?: (date: string) => void
  onDoubleClickAgendaDate?: (date: string) => void
  onClickPlusEvents?: (date: string) => void

  beforeRender?: ($app: CalendarAppSingleton) => void
  onRender?: ($app: CalendarAppSingleton) => void

  isCalendarSmall?: ($app: CalendarAppSingleton) => boolean
}
