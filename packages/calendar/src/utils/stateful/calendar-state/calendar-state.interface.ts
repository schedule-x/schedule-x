import { View } from '../../../types/view'
import { Signal } from '@preact/signals'
import { DateRange } from '../../../types/date-range'

export default interface CalendarState {
  view: Signal<View>
  range: Signal<DateRange | null>

  handleDateSelection: (date: string) => void
}
