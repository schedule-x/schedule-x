import Builder from '../../../interfaces/builder.interface'
import DatePickerState from './date-picker-state.interface'
import DatePickerStateImpl from './date-picker-state.impl'

export default class DatePickerStateBuilder
  implements Builder<DatePickerState>
{
  constructor(public selectedDate?: string) {}

  build(): DatePickerState {
    return new DatePickerStateImpl(this.selectedDate)
  }
}
