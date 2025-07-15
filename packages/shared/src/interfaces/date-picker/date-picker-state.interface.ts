import { DatePickerView } from './date-picker-view.enum'
import { Signal } from '@preact/signals'
import { Temporal } from 'temporal-polyfill'

export default interface DatePickerState {
  isOpen: Signal<boolean>
  isDisabled: Signal<boolean>
  selectedDate: Signal<Temporal.PlainDate>
  inputDisplayedValue: Signal<string>
  datePickerDate: Signal<Temporal.PlainDate>
  datePickerView: Signal<DatePickerView>
  inputWrapperElement: Signal<HTMLDivElement | undefined>
  isDark: Signal<boolean>

  open(): void
  close(): void
  toggle(): void

  setView(view: DatePickerView): void
}
