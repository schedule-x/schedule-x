import { render } from 'preact'
import CalendarWrapper from './components/calendar-wrapper'

export default class CalendarApp {
  constructor(private el: HTMLElement) {}

  bootstrap(): void {
    render(CalendarWrapper, this.el)
  }
}
