import TimeUnits from '../utils/stateful/time-units/time-units.interface'
import DatePickerState from '@schedule-x/date-picker/src/utils/stateful/date-picker-state/date-picker-state.interface'
import { TranslateFn } from '@schedule-x/translations/src'

/**
 * This interface serves as a bridge between the AppSingleton for the date picker and calendar
 * */
export default interface AppSingleton {
  timeUnitsImpl: TimeUnits
  datePickerState: DatePickerState
  translate: TranslateFn
}
