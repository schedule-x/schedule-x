import DatePickerState from './date-picker-state.interface'
import { DatePickerView } from '@schedule-x/date-picker/src/enums/date-picker-view.enum'
import { effect, signal } from '@preact/signals'
import { toDateString as formatToDateString } from '../../stateless/time/format-conversion/date-format/to-date-string'
import { toDateString as dateToDateString } from '../../stateless/time/format-conversion/date-to-strings'
import DatePickerConfigInternal from '@schedule-x/date-picker/src/utils/stateful/config/config.interface.ts'

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
    if (config.listeners?.onChange) config.listeners.onChange(selectedDate.value)
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
