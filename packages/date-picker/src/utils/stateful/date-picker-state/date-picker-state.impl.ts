import DatePickerState from '@schedule-x/shared/src/interfaces/date-picker/date-picker-state.interface'
import { DatePickerView } from '@schedule-x/shared/src/interfaces/date-picker/date-picker-view.enum'
import { effect, signal } from '@preact/signals'
import { toDateString as formatToDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-format/to-date-string'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import { toLocalizedDateString } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'

import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

const getLocalizedDate = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  locale: string
) => {
  return toLocalizedDateString(date, locale)
}

export const createDatePickerState = (
  config: DatePickerConfigInternal,
  selectedDateParam?: Temporal.PlainDate
): DatePickerState => {
  const initialSelectedDate =
    selectedDateParam instanceof Temporal.PlainDate
      ? selectedDateParam
      : Temporal.Now.plainDateISO()

  const isOpen = signal(false)
  const isDisabled = signal(config.disabled || false)
  const datePickerView = signal(DatePickerView.MONTH_DAYS)
  const selectedDate = signal<Temporal.PlainDate>(initialSelectedDate)
  const datePickerDate = signal<Temporal.PlainDate>(initialSelectedDate)
  const isDark = signal(config.style?.dark || false)
  const inputDisplayedValue = signal(
    toLocalizedDateString(initialSelectedDate, config.locale.value)
  )
  const lastValidDisplayedValue = signal(inputDisplayedValue.value)

  const handleInput = (newInputValue: string) => {
    try {
      const newValue = formatToDateString(newInputValue, config.locale.value)
      if (
        newValue < config.min.toString() ||
        newValue > config.max.toString()
      ) {
        inputDisplayedValue.value = lastValidDisplayedValue.value
        return
      }
      const { year, month, date: day } = toIntegers(newValue)
      const newPlainDate = Temporal.PlainDate.from({
        year,
        month: month + 1,
        day,
      })
      selectedDate.value = newPlainDate
      datePickerDate.value = newPlainDate
      lastValidDisplayedValue.value = inputDisplayedValue.value
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      // Nothing to do here. We don't want to log errors when users are typing invalid formats
    }
  }

  effect(() => {
    inputDisplayedValue.value = getLocalizedDate(
      selectedDate.value,
      config.locale.value
    )
  })

  let wasInitialized = false
  const handleOnChange = (selectedDate: Temporal.PlainDate) => {
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
    handleInput,
    isDark,
    open: () => (isOpen.value = true),
    close: () => (isOpen.value = false),
    toggle: () => (isOpen.value = !isOpen.value),
    setView: (view: DatePickerView) => (datePickerView.value = view),
  }
}
