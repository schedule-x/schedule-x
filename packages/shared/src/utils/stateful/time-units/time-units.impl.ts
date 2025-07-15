import TimeUnits from './time-units.interface'
import { WeekDay } from '../../../enums/time/week-day.enum'
import { Month } from '../../../enums/time/month.enum'
import { WeekWithDates } from '../../../types/time'
import { NoYearZeroError } from '../../stateless/errors/no-year-zero.error'
import ExtendedDateImpl from '../time/extended-date/extended-date.impl'
import Config from '../../../interfaces/config.interface'
import { Temporal } from 'temporal-polyfill'

export default class TimeUnitsImpl implements TimeUnits {
  constructor(private config: Config) {}

  get firstDayOfWeek() {
    return this.config.firstDayOfWeek.value
  }

  set firstDayOfWeek(firstDayOfWeek: WeekDay) {
    this.config.firstDayOfWeek.value = firstDayOfWeek
  }

  getMonth(year: number, month: Month): Temporal.ZonedDateTime[] {
    if (year === 0) throw new NoYearZeroError()

    const firstDateOfMonth = Temporal.PlainDate.from({ year, month: month, day: 1 })
    const lastDateOfMonth = firstDateOfMonth.toPlainYearMonth().toPlainDate({ day: firstDateOfMonth.toPlainYearMonth().daysInMonth })
    const dates: Temporal.ZonedDateTime[] = []

    let currentDate = firstDateOfMonth
    while (Temporal.PlainDate.compare(currentDate, lastDateOfMonth) <= 0) {
      dates.push(currentDate.toZonedDateTime(this.config.timezone.value))
      currentDate = currentDate.add({ days: 1 })
    }

    return dates
  }

  getMonthWithTrailingAndLeadingDays(year: number, month: Month) {
    if (year === 0) throw new NoYearZeroError()

    const firstDateOfMonth = Temporal.PlainDate.from({ year, month: month, day: 1 })
    const monthWithDates = [this.getWeekForTemporal(firstDateOfMonth)]

    let isInMonth = true
    let currentWeekStart = monthWithDates[0][0] // first day of first week of month

    while (isInMonth) {
      const nextWeekStart = currentWeekStart.add({ days: 7 })

      // Check if the next week contains any dates from the target month
      const nextWeekDates = this.getWeekForTemporal(nextWeekStart)
      const hasDatesInTargetMonth = nextWeekDates.some(date => date.month === month)

      if (hasDatesInTargetMonth) {
        monthWithDates.push(nextWeekDates)
        currentWeekStart = nextWeekStart
      } else {
        isInMonth = false
      }
    }

    // Convert Temporal.PlainDate arrays to Temporal.ZonedDateTime arrays
    return monthWithDates.map(week => 
      week.map(plainDate => 
        plainDate.toZonedDateTime(this.config.timezone.value)
      )
    )
  }

  getWeekFor(date: Temporal.ZonedDateTime | Temporal.PlainDate): WeekWithDates {
    const plainDate = date instanceof Temporal.PlainDate ? date : date.toPlainDate()
    const week: WeekWithDates = [this.getFirstDateOfWeekTemporal(plainDate).toZonedDateTime(this.config.timezone.value)]

    while (week.length < 7) {
      const lastDateOfWeek = week[week.length - 1]
      const nextDateOfWeek = lastDateOfWeek.add({ days: 1 })
      week.push(nextDateOfWeek)
    }

    return week
  }

  getMonthsFor(year: number): Date[] {
    return Object.values(Month)
      .filter((month) => !isNaN(Number(month)))
      .map((month) => new ExtendedDateImpl(year, Number(month), 1))
  }

  private getWeekForTemporal(date: Temporal.PlainDate): Temporal.PlainDate[] {
    const week: Temporal.PlainDate[] = [this.getFirstDateOfWeekTemporal(date)]

    while (week.length < 7) {
      const lastDateOfWeek = week[week.length - 1]
      const nextDateOfWeek = lastDateOfWeek.add({ days: 1 })
      week.push(nextDateOfWeek)
    }

    return week
  }

  private getFirstDateOfWeekTemporal(date: Temporal.PlainDate): Temporal.PlainDate {
    const dateIsNthDayOfWeek = date.dayOfWeek - this.firstDayOfWeek

    if (dateIsNthDayOfWeek === 0) {
      return date
    } else if (dateIsNthDayOfWeek > 0) {
      return date.subtract({ days: dateIsNthDayOfWeek })
    } else {
      return date.subtract({ days: 7 + dateIsNthDayOfWeek })
    }
  }
}
