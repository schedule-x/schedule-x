import DatePickerState from './date-picker-state.interface'
import ExtendedDateImpl from '../time/extended-date/extended-date.impl'
import { doubleDigit } from '../../stateless/time/date-time-mutation/date-time-mutation'
import { DatePickerView } from '@schedule-x/date-picker/src/enums/date-picker-view.enum'
import { signal } from '@preact/signals'

export const createDatePickerState = (
  selectedDateParam?: string
): DatePickerState => {
  const initialSelectedDate =
    selectedDateParam ||
    (() => {
      const { year, month, date } = new ExtendedDateImpl(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )

      return `${year}-${doubleDigit(month + 1)}-${doubleDigit(date)}`
    })()

  const isOpen = signal(false)
  const datePickerView = signal(DatePickerView.MONTH_DAYS)
  const selectedDate = signal(initialSelectedDate)
  const datePickerDate = signal(initialSelectedDate)

  return {
    isOpen,
    datePickerView,
    selectedDate,
    datePickerDate,
    open: () => (isOpen.value = true),
    close: () => (isOpen.value = false),
    toggle: () => (isOpen.value = !isOpen.value),
    setView: (view: DatePickerView) => (datePickerView.value = view),
  }
}
