import { createElement, render } from 'preact'
import AppWrapper from './components/app-wrapper'
import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'

export default class DatePickerApp {
  constructor(private $app: DatePickerAppSingleton) {}

  render(el: HTMLElement): void {
    render(
      createElement(AppWrapper, {
        $app: this.$app,
      }),
      el
    )
  }

  get value() {
    return this.$app.datePickerState.selectedDate.value
  }

  set value(value: Temporal.PlainDate) {
    this.$app.datePickerState.selectedDate.value =
      Temporal.PlainDate.from(value)
  }

  get disabled() {
    return this.$app.datePickerState.isDisabled.value
  }

  set disabled(value: boolean) {
    this.$app.datePickerState.isDisabled.value = value
  }

  setTheme(theme: 'light' | 'dark') {
    this.$app.datePickerState.isDark.value = theme === 'dark'
  }

  getTheme() {
    return this.$app.datePickerState.isDark.value ? 'dark' : 'light'
  }
}
