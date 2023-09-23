import DatePickerState from './date-picker-state.interface'
import { DatePickerView } from '../../../enums/date-picker-view.enum'
import { effect, signal } from '@preact/signals'
import { toDateString as formatToDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-format/to-date-string'
import { toDateString as dateToDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import DatePickerConfigInternal from '../config/config.interface'

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
  const datePickerView = signal(DatePickerView.MONTH_DAYS)
  const selectedDate = signal(initialSelectedDate)
  const datePickerDate = signal(initialSelectedDate || currentDayDateString)

  const inputDisplayedValue = signal(selectedDateParam || '')
  effect(() => {
    try {
      const newValue = formatToDateString(
        inputDisplayedValue.value,
        config.locale
      ) as string
      selectedDate.value = newValue
      datePickerDate.value = newValue
    } catch (e) {
      // nothing to do
    }
  })

  effect(() => {
    if (config.listeners?.onChange)
      config.listeners.onChange(selectedDate.value)
  })

  return {
    isOpen,
    datePickerView,
    selectedDate,
    datePickerDate,
    inputDisplayedValue,
    open: () => (isOpen.value = true),
    close: () => (isOpen.value = false),
    toggle: () => (isOpen.value = !isOpen.value),
    setView: (view: DatePickerView) => (datePickerView.value = view),
  }
}
