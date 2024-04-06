import { TimePickerConfig } from './time-picker-config'
import { TranslateFn } from '@schedule-x/shared/src/types/translations'
import { TimePickerState } from './time-picker-state'

export interface TimePickerAppContext {
  config: TimePickerConfig
  translate: TranslateFn
  timePickerState: TimePickerState
}
