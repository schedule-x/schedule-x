import ExtendedDate from './extended-date.interface'
import { NoYearZeroError } from '../../../stateless/errors/no-year-zero.error'

export default class ExtendedDateImpl extends Date implements ExtendedDate {
  constructor(yearArg: number, monthArg: number, dateArg: number) {
    super(yearArg, monthArg, dateArg)

    if (yearArg === 0) throw new NoYearZeroError()

    this.setFullYear(yearArg) // Overwrite the behavior of JS-Date, whose constructor does not allow years 0-99
  }

  get year(): number {
    return this.getFullYear()
  }

  get month(): number {
    return this.getMonth()
  }

  get date(): number {
    return this.getDate()
  }
}
