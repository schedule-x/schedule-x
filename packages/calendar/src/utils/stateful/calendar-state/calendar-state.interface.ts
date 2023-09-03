import { ViewName } from '../../../types/view-name'
import { Signal } from '@preact/signals'
import { DateRange } from '../../../types/date-range'
import { View } from '../../../types/view'

export default interface CalendarState {
  view: Signal<ViewName>
  range: Signal<DateRange | null>

  handleDateSelection: (date: string) => void
}
