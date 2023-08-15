import TimeUnits from '../utils/stateful/time-units/time-units.interface'
import DatePickerState from '../utils/stateful/date-picker-state/date-picker-state.interface'
import Config from './config.interface'
import { TranslateFn } from '../../packages/translations/src'

export default interface AppSingleton {
  timeUnitsImpl: TimeUnits
  datePickerState: DatePickerState
  config: Config
  translate: TranslateFn
}
