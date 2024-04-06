import { TimePickerConfigExternal } from './types/time-picker-config'
import TimePickerApp from './time-picker.app'
import { signal } from '@preact/signals'

export const createTimePickerAppContext = (
  config: TimePickerConfigExternal = {}
) => ({
  config: {
    dark: signal(config.dark ?? false),
    placement: signal(config.placement ?? 'bottom-start'),
  },
  timePickerState: {
    isOpen: signal(false),
    currentTime: signal(config.initialValue ?? '00:00'),
  },
})

export const createTimePicker = (config: TimePickerConfigExternal = {}) => {
  return new TimePickerApp(createTimePickerAppContext(config))
}
