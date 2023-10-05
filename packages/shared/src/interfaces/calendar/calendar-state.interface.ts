import { ViewName } from '@schedule-x/calendar/src/types/view-name'
import { Signal } from '@preact/signals'
import { DateRange } from '@schedule-x/calendar/src/types/date-range'
import { CalendarEventInternal } from './calendar-event.interface'

export default interface CalendarState {
  view: Signal<ViewName>
  range: Signal<DateRange | null>
  lastClickedEvent: Signal<CalendarEventInternal | null>
  setLastClickedEvent: (event: CalendarEventInternal | null) => void

  handleDateSelection: (date: string) => void
}
