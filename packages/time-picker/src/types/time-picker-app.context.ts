import { TimePickerConfig } from './time-picker-config'
import { TimePickerState } from './time-picker-state'

export interface TimePickerAppContext {
  config: TimePickerConfig
  timePickerState: TimePickerState
}
