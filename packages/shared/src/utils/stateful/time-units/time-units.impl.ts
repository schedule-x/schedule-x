import TimeUnits from './time-units.interface'
import { WeekDay } from '../../../enums/time/week-day.enum'
import { Month } from '../../../enums/time/month.enum'
import { WeekWithDates } from '../../../types/time'
import { NoYearZeroError } from '../../stateless/errors/no-year-zero.error'
import ExtendedDateImpl from '../time/extended-date/extended-date.impl'
import { DEFAULT_FIRST_DAY_OF_WEEK } from '../../../values'

export default class TimeUnitsImpl implements TimeUnits {
  constructor(public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK) {}

  getMonthWithTrailingAndLeadingDays(year: number, month: Month) {
    if (year === 0) throw new NoYearZeroError()

    const firstDateOfMonth = new Date(year, month, 1)
    const monthWithDates = [this.getWeekFor(firstDateOfMonth)]

    let isInMonth = true
    let first = monthWithDates[0][0] // first day of first week of month

    while (isInMonth) {
      const newFirstDayOfWeek = new Date(
        first.getFullYear(),
        first.getMonth(),
        first.getDate() + 7
      )

      if (newFirstDayOfWeek.getMonth() === month) {
        monthWithDates.push(this.getWeekFor(newFirstDayOfWeek))
        first = newFirstDayOfWeek
      } else {
        isInMonth = false
      }
    }

    return monthWithDates
  }

  getWeekFor(date: Date): WeekWithDates {
    const week: WeekWithDates = [this.getFirstDateOfWeek(date)]

    while (week.length < 7) {
      const lastDateOfWeek = week[week.length - 1]
      const nextDateOfWeek = new Date(lastDateOfWeek)
      nextDateOfWeek.setDate(lastDateOfWeek.getDate() + 1)
      week.push(nextDateOfWeek)
    }

    return week
  }

  getMonthsFor(year: number): Date[] {
    return Object.values(Month)
      .filter((month) => !isNaN(Number(month)))
      .map((month) => new ExtendedDateImpl(year, Number(month), 1))
  }

  private getFirstDateOfWeek(date: Date) {
    const dateIsNthDayOfWeek = date.getDay() - this.firstDayOfWeek

    const firstDateOfWeek = date
    if (dateIsNthDayOfWeek === 0) {
      return firstDateOfWeek
    } else if (dateIsNthDayOfWeek > 0) {
      firstDateOfWeek.setDate(date.getDate() - dateIsNthDayOfWeek)
    } else {
      firstDateOfWeek.setDate(date.getDate() - (7 + dateIsNthDayOfWeek))
    }

    return firstDateOfWeek
  }
}
