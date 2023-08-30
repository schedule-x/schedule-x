import { createElement, render } from 'preact'
import CalendarWrapper from './components/calendar-wrapper'
import AppSingleton from '../../../shared/interfaces/app-singleton.interface'

export default class CalendarApp {
  constructor(
    private el: HTMLElement,
    $app: AppSingleton
  ) {}

  bootstrap(): void {
    render(createElement(CalendarWrapper, {}), this.el)
  }
}
