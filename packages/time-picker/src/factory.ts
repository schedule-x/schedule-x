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

  const initialIsAM = parseInt(currentTime.value.split(':')[0]) < 12
  const isAM = signal(initialIsAM)
  return {
    isOpen: signal(false),
    currentTime,
    currentTimeDisplayedValue: computed(() => {
      const [hours, minutes] = currentTime.value.split(':')
      const parsedHours = parseInt(hours)
      let hoursInt = parsedHours
      const minutesInt = parseInt(minutes)

      if (is12HourClock) {
        hoursInt = hoursInt === 0 ? 12 : hoursInt
        const hours12 = hoursInt > 12 ? hoursInt - 12 : hoursInt
        return `${hours12}:${minutesInt.toString().padStart(2, '0')} ${parsedHours >= 12 ? 'PM' : 'AM'}`
      }

      return `${hoursInt.toString().padStart(2, '0')}:${minutesInt.toString().padStart(2, '0')}`
    }),
    inputWrapperElement: signal(undefined),
    isAM,
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
    name: signal(config.name ?? ''),
  },
  timePickerState: getTimePickerState(config, config.is12Hour ?? false),
})

export const createTimePicker = (config: TimePickerConfigExternal = {}) => {
  return new TimePickerApp(createTimePickerAppContext(config))
}
