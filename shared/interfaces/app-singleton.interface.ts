import TimeUnits from '../utils/stateful/time-units/time-units.interface'
import DatePickerState from '../../packages/date-picker/src/utils/stateful/date-picker-state/date-picker-state.interface'
import { TranslateFn } from '../../packages/translations/src'

export default interface AppSingleton {
  timeUnitsImpl: TimeUnits
  datePickerState: DatePickerState
  translate: TranslateFn
}
