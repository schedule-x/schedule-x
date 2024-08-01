import DatePickerState from '@schedule-x/shared/src/interfaces/date-picker/date-picker-state.interface'
import { DatePickerView } from '@schedule-x/shared/src/interfaces/date-picker/date-picker-view.enum'
import { effect, signal } from '@preact/signals'
import { toDateString as formatToDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-format/to-date-string'
import { toDateString as dateToDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'

export const createDatePickerState = (
  config: DatePickerConfigInternal,
  selectedDateParam?: string
): DatePickerState => {
  const currentDayDateString = dateToDateString(new Date())
  const initialSelectedDate =
    typeof selectedDateParam === 'string'
      ? selectedDateParam
      : currentDayDateString

  const isOpen = signal(false)
  const isDisabled = signal(config.disabled || false)
  const datePickerView = signal(DatePickerView.MONTH_DAYS)
  const selectedDate = signal(initialSelectedDate)
  const datePickerDate = signal(initialSelectedDate || currentDayDateString)
  const isDark = signal(config.style?.dark || false)

  const inputDisplayedValue = signal(selectedDateParam || '')
  const lastValidDisplayedValue = signal(selectedDateParam || '')
  effect(() => {
    try {
      const newValue = formatToDateString(
        inputDisplayedValue.value,
        config.locale
      )
      if (newValue < config.min || newValue > config.max) {
        inputDisplayedValue.value = lastValidDisplayedValue.value
        return
      }

      selectedDate.value = newValue
      datePickerDate.value = newValue
      lastValidDisplayedValue.value = inputDisplayedValue.value
    } catch (e) {
      // nothing to do
    }
  })

  let wasInitialized = false
  const handleOnChange = (selectedDate: string) => {
    if (!wasInitialized) return (wasInitialized = true)

    config.listeners.onChange!(selectedDate)
  }

  effect(() => {
    if (config.listeners?.onChange) handleOnChange(selectedDate.value)
  })

  return {
    inputWrapperElement: signal(undefined),
    isOpen,
    isDisabled,
    datePickerView,
    selectedDate,
    datePickerDate,
    inputDisplayedValue,
    isDark,
    open: () => (isOpen.value = true),
    close: () => (isOpen.value = false),
    toggle: () => (isOpen.value = !isOpen.value),
    setView: (view: DatePickerView) => (datePickerView.value = view),
  }
}
