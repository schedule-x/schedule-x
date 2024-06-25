import { ViewName } from '../../types/calendar/view-name'
import { ReadonlySignal, Signal } from '@preact/signals'
import { DateRange } from '../../types/date-range'

export default interface CalendarState {
  isCalendarSmall: Signal<boolean | undefined>
  view: ReadonlySignal<ViewName>
  setView: (view: ViewName, selectedDate: string) => void
  range: Signal<DateRange | null>
  isDark: Signal<boolean>

  setRange: (date: string) => void
}
