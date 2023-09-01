import { createElement, render } from 'preact'
import CalendarWrapper from './components/header/calendar-wrapper'
import CalendarAppSingleton from './utils/stateful/app-singleton/calendar-app-singleton'

export default class CalendarApp {
  constructor(
    private el: HTMLElement,
    private $app: CalendarAppSingleton
  ) {}

  bootstrap(): void {
    render(createElement(CalendarWrapper, { $app: this.$app }), this.el)
  }
}
