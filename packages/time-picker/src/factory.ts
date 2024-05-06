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
    inputWrapperElement: signal(undefined),
  }
}

export const createTimePickerAppContext = (
  config: TimePickerConfigExternal = {}
) => ({
  config: {
    dark: signal(config.dark ?? false),
    placement: signal(config.placement ?? 'bottom-start'),
    teleportTo: signal(config.teleportTo ?? null),
    label: signal(config.label ?? null),
  },
  timePickerState: getTimePickerState(config),
})

export const createTimePicker = (config: TimePickerConfigExternal = {}) => {
  return new TimePickerApp(createTimePickerAppContext(config))
}
