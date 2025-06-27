import { WeekDay } from '../../../enums/time/week-day.enum'
import { MonthWithDates, WeekWithDates } from '../../../types/time'
import { Month } from '../../../enums/time/month.enum'

export default interface TimeUnits {
  firstDayOfWeek: WeekDay

  getMonthWithTrailingAndLeadingDays(year: number, month: Month): MonthWithDates
  getWeekFor(date: Date): WeekWithDates
  getMonthsFor(year: number): Date[]
  getMonth(year: number, month: Month): Date[]
}
