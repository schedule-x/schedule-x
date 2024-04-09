import { TimePickerConfigExternal } from './types/time-picker-config'
import TimePickerApp from './time-picker.app'
import { effect, signal } from '@preact/signals'
import { TimePickerState } from './types/time-picker-state'

const getTimePickerState = (
  config: TimePickerConfigExternal
): TimePickerState => {
  const currentTime = signal(config.initialValue ?? '00:00')
  let wasInitialized = false

  const handleCurrentTimeChanged = (
    config: TimePickerConfigExternal,
    currentTime: string
  ) => {
    if (!wasInitialized) return (wasInitialized = true)

    if (config.onChange) {
      config.onChange(currentTime)
    }
  }

  effect(() => {
    handleCurrentTimeChanged(config, currentTime.value)
  })

  return {
    isOpen: signal(false),
    currentTime: currentTime,
    inputRect: signal({ x: 0, y: 0, height: 0, width: 0 }),
  }
}

export const createTimePickerAppContext = (
  config: TimePickerConfigExternal = {}
) => ({
  config: {
    dark: signal(config.dark ?? false),
    placement: signal(config.placement ?? 'bottom-start'),
    teleportTo: signal(config.teleportTo ?? null),
  },
  timePickerState: getTimePickerState(config),
})

export const createTimePicker = (config: TimePickerConfigExternal = {}) => {
  return new TimePickerApp(createTimePickerAppContext(config))
}
