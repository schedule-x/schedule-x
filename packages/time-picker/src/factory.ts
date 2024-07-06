import { TimePickerConfigExternal } from './types/time-picker-config'
import TimePickerApp from './time-picker.app'
import { computed, effect, signal } from '@preact/signals'
import { TimePickerState } from './types/time-picker-state'

const getTimePickerState = (
  config: TimePickerConfigExternal,
  is12HourClock: boolean
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

  const isArm = signal(true)
  return {
    isOpen: signal(false),
    currentTime: currentTime,
    currentTimeDisplayedValue: computed(() => {
      const [hours, minutes] = currentTime.value.split(':')
      const hoursIntParsed = parseInt(hours)
      const hoursInt = hoursIntParsed === 0 ? 12 : hoursIntParsed
      const minutesInt = parseInt(minutes)
      if (is12HourClock) {
        const hours12 = hoursInt > 12 ? hoursInt - 12 : hoursInt
        return `${hours12}:${minutesInt.toString().padStart(2, '0')} ${
          hoursInt >= 12 ? 'PM' : 'AM'
        }`
      }

      return `${hoursInt}:${minutesInt.toString().padStart(2, '0')}`
    }),
    inputWrapperElement: signal(undefined),
    isAM: isArm,
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
    is12Hour: signal(config.is12Hour ?? false),
  },
  timePickerState: getTimePickerState(config, config.is12Hour ?? false),
})

export const createTimePicker = (config: TimePickerConfigExternal = {}) => {
  return new TimePickerApp(createTimePickerAppContext(config))
}
