import { RRuleOptions, RRuleOptionsExternal } from './types/rrule-options'
import { getDurationInMinutes } from './utils/stateless/duration-in-minutes'
import { weeklyIteratorResult } from './utils/stateless/weekly-iterator'
import { RRuleFreq } from './enums/rrule-freq'
import { Recurrence } from '../types/recurrence'
import { sxDateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import { addMinutes } from '@schedule-x/shared/src'
import { dailyIteratorResult } from './utils/stateless/daily-iterator'
import { monthlyIteratorResult } from './utils/stateless/monthly-iterators'
import { yearlyIteratorResult } from './utils/stateless/yearly-iterator'
import { addDaysToDateOrDateTime } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

export class RRule {
  private options: RRuleOptions
  private durationInMinutes: number | undefined
  private durationInDays: number | undefined

  constructor(
    options: RRuleOptionsExternal,
    private dtstart: string,
    dtend?: string
  ) {
    this.options = {
      ...options,
      interval: options.interval ?? 1,
    }

    const actualDTEND = dtend || dtstart /* RFC5545: #1 */

    if (this.isDateTime) {
      this.durationInMinutes = getDurationInMinutes(this.dtstart, actualDTEND)
    } else {
      this.durationInDays = calculateDaysDifference(
        Temporal.PlainDate.from(this.dtstart),
        Temporal.PlainDate.from(actualDTEND)
      )
    }
  }

  getRecurrences(): Recurrence[] {
    if (this.options.freq === RRuleFreq.DAILY) return this.getDatesForDaily()

    if (this.options.freq === RRuleFreq.WEEKLY)
      return this.getDatesForFreqWeekly()

    if (this.options.freq === RRuleFreq.MONTHLY)
      return this.getDatesForFreqMonthly()

    if (this.options.freq === RRuleFreq.YEARLY)
      return this.getDatesForFreqYearly()

    throw new Error('freq is required')
  }

  private getDatesForFreqWeekly(): Recurrence[] {
    return weeklyIteratorResult(this.dtstart, this.options).map(
      this.getRecurrenceBasedOnStartDates.bind(this)
    )
  }

  private getDatesForDaily(): Recurrence[] {
    return dailyIteratorResult(this.dtstart, this.options).map(
      this.getRecurrenceBasedOnStartDates.bind(this)
    )
  }

  private getDatesForFreqMonthly(): Recurrence[] {
    return monthlyIteratorResult(this.dtstart, this.options).map(
      this.getRecurrenceBasedOnStartDates.bind(this)
    )
  }

  private getDatesForFreqYearly(): Recurrence[] {
    return yearlyIteratorResult(this.dtstart, this.options).map(
      this.getRecurrenceBasedOnStartDates.bind(this)
    )
  }

  private getRecurrenceBasedOnStartDates(date: string) {
    return {
      start: date,
      end: this.isDateTime
        ? addMinutes(date, this.durationInMinutes!)
        : addDaysToDateOrDateTime(date, this.durationInDays!),
    }
  }

  private get isDateTime() {
    return sxDateTimeStringRegex.test(this.dtstart)
  }
}
