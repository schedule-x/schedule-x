import { createElement, render } from 'preact'
import { TimePickerAppContext } from './types/time-picker-app.context'
import TimePickerWrapper from './components/time-picker-wrapper'

export default class TimePickerApp {
  constructor(private $app: TimePickerAppContext) {}

  render(el: HTMLElement): void {
    render(
      createElement(TimePickerWrapper, {
        $app: this.$app,
      }),
      el
    )
  }

  get value() {
    return this.$app.timePickerState.currentTime.value
  }

  set value(value: string) {
    this.$app.timePickerState.currentTime.value = value
  }
}
