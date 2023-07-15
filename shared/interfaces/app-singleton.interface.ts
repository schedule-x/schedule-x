import TimeUnits from '../utils/stateful/time-units/time-units.interface'
import DatePickerState from '../utils/stateful/date-picker-state/date-picker-state.interface'

export default interface AppSingleton {
  timeUnitsImpl: TimeUnits
  datePickerState: DatePickerState
}
