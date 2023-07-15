import DatePickerState from './date-picker-state.interface'
import ExtendedDateImpl from '../time/extended-date/extended-date.impl'
import { doubleDigit } from '../../stateless/time/date-time-mutation/date-time-mutation'

export default class DatePickerStateImpl implements DatePickerState {
  isOpen = false

  constructor(public selectedDate: string | undefined) {
    if (typeof selectedDate !== 'string') this.setDefaultSelectedDate()
  }

  open(): void {
    this.isOpen = true
  }

  close(): void {
    this.isOpen = false
  }

  toggle(): void {
    this.isOpen = !this.isOpen
  }

  private setDefaultSelectedDate(): void {
    const { year, month, date } = new ExtendedDateImpl(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )

    this.selectedDate = `${year}-${doubleDigit(month)}-${doubleDigit(date)}`
  }
}
