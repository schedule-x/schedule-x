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
    throw new Error('Method not implemented.')
  }

  set value(value: string) {
    throw new Error('Method not implemented.')
  }
}
