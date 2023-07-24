import { createElement, render } from 'preact'
import AppWrapper from './components/app-wrapper'
import DatePickerAppSingleton from './utils/stateful/app-singleton/date-picker-app.singleton'

export default class DatePickerApp {
  constructor(
    private $app: DatePickerAppSingleton,
    private el: HTMLElement
  ) {}

  bootstrap(): void {
    render(
      createElement(AppWrapper, {
        $app: this.$app,
      }),
      this.el
    )
  }
}
