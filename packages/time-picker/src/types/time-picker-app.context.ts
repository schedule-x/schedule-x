import { TimePickerConfig } from './time-picker-config'
import { TimePickerState } from './time-picker-state'
import { TranslateFn } from '@schedule-x/shared/src/types/translations'

export interface TimePickerAppContext {
  config: TimePickerConfig
  timePickerState: TimePickerState
  translate: TranslateFn
}
