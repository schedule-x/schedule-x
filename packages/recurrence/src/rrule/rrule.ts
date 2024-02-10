import { RRuleOptions, RRuleOptionsExternal } from './types/rrule-options'
import { getDurationInMinutes } from './utils/stateless/duration-in-minutes'
import { weeklyIteratorResult } from './utils/stateless/weekly-iterator'
import { RRuleFreq } from './enums/rrule-freq'
import { Recurrence } from '../types/recurrence'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { addDays, addMinutes } from '@schedule-x/shared/src'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { dailyIteratorResult } from './utils/stateless/daily-iterator'
import { monthlyIteratorResult } from './utils/stateless/monthly-iterators'
import { yearlyIteratorResult } from './utils/stateless/yearly-iterator'

export class RRule {
  private options: RRuleOptions
  private durationInMinutes: number | undefined
  private durationInDays: number | undefined
  private readonly dtstartTime: string | undefined

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
      this.dtstartTime = timeFromDateTime(this.dtstart)
      this.durationInMinutes = getDurationInMinutes(this.dtstart, actualDTEND)
    } else {
      this.durationInDays = calculateDaysDifference(this.dtstart, actualDTEND)
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
    return weeklyIteratorResult(this.dtstart, this.options).map((date) => {
      return {
        start: date,
        end: this.isDateTime
          ? addMinutes(date, this.durationInMinutes!)
          : addDays(date, this.durationInDays!),
      }
    })
  }

  private getDatesForDaily(): Recurrence[] {
    return dailyIteratorResult(this.dtstart, this.options).map((date) => {
      return {
        start: date,
        end: this.isDateTime
          ? addMinutes(date, this.durationInMinutes!)
          : addDays(date, this.durationInDays!),
      }
    })
  }

  private getDatesForFreqMonthly(): Recurrence[] {
    return monthlyIteratorResult(this.dtstart, this.options).map((date) => {
      return {
        start: date,
        end: this.isDateTime
          ? addMinutes(date, this.durationInMinutes!)
          : addDays(date, this.durationInDays!),
      }
    })
  }

  private getDatesForFreqYearly(): Recurrence[] {
    return yearlyIteratorResult(this.dtstart, this.options).map((date) => {
      return {
        start: date,
        end: this.isDateTime
          ? addMinutes(date, this.durationInMinutes!)
          : addDays(date, this.durationInDays!),
      }
    })
  }

  private get isDateTime() {
    return dateTimeStringRegex.test(this.dtstart)
  }
}
