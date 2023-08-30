import { createElement, render } from 'preact'
import CalendarWrapper from './components/calendar-wrapper'
import CalendarAppSingleton from './utils/stateful/app-singleton/calendar-app-singleton'

export default class CalendarApp {
  constructor(
    private el: HTMLElement,
    $app: CalendarAppSingleton
  ) {}

  bootstrap(): void {
    render(createElement(CalendarWrapper, {}), this.el)
  }
}
