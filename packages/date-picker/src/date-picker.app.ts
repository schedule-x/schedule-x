import { createElement, render } from 'preact'
import DatePickerWrapper from './components/date-picker-wrapper'
import DatePickerConfig from './interfaces/config.interface'
import DatePickerSingleton from './interfaces/app-singleton.interface'

export default class DatePickerApp {
  constructor(
    private $app: DatePickerSingleton,
    private config: DatePickerConfig,
    private el: HTMLElement
  ) {}

  bootstrap(): void {
    render(
      createElement(DatePickerWrapper, {
        $app: this.$app,
        config: this.config,
      }),
      this.el
    )
  }
}
