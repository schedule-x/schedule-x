import TimeUnits from '../utils/stateful/time-units/time-units.interface'
import DatePickerState from './date-picker/date-picker-state.interface'
import { TranslateFn } from '../types/translations'

/**
 * This interface serves as a bridge between the AppSingleton for the date picker and calendar
 * */
export default interface AppSingleton {
  timeUnitsImpl: TimeUnits
  datePickerState: DatePickerState
  translate: TranslateFn
}
