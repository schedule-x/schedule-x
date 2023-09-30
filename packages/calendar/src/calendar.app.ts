import { createElement, render } from 'preact'
import CalendarWrapper from './components/calendar-wrapper'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export default class CalendarApp {
  constructor(
    private el: HTMLElement,
    private $app: CalendarAppSingleton
  ) {}

  bootstrap(): void {
    render(createElement(CalendarWrapper, { $app: this.$app }), this.el)
  }
}
