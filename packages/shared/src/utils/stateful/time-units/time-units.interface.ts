import { WeekDay } from '../../../enums/time/week-day.enum'
import { MonthWithDates, WeekWithDates } from '../../../types/time'
import { Month } from '../../../enums/time/month.enum'
import { Temporal } from 'temporal-polyfill'

export default interface TimeUnits {
  firstDayOfWeek: WeekDay

  getMonthWithTrailingAndLeadingDays(year: number, month: Month): MonthWithDates
  getWeekFor(date: Temporal.ZonedDateTime | Temporal.PlainDate): WeekWithDates
  getMonthsFor(year: number): Date[]
  getMonth(year: number, month: Month): Temporal.ZonedDateTime[]
}
