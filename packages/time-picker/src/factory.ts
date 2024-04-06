import { TimePickerConfigExternal } from './types/time-picker-config'
import TimePickerApp from './time-picker.app'
import { signal } from '@preact/signals'

export const createTimePicker = (config: TimePickerConfigExternal = {}) => {
  return new TimePickerApp({
    config: {
      dark: signal(config.dark ?? false),
      placement: signal(config.placement ?? 'bottom-start'),
    },
    translate: () => '',
    timePickerState: {
      isOpen: signal(false),
      currentTime: signal(config.initialValue ?? '00:00'),
    },
  })
}
