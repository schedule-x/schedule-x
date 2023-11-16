import { ViewName } from '../../types/calendar/view-name'
import { Signal } from '@preact/signals'
import { DateRange } from '../../types/date-range'

export default interface CalendarState {
  isCalendarSmall: Signal<boolean | undefined>
  view: Signal<ViewName>
  range: Signal<DateRange | null>

  handleDateSelection: (date: string) => void
}
