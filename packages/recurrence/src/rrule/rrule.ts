import { RRuleOptions, RRuleOptionsExternal } from './types/rrule-options'
import { getTemporalDuration } from './utils/stateless/temporal-duration'
import { weeklyIteratorResult } from './utils/stateless/weekly-iterator'
import { RRuleFreq } from './enums/rrule-freq'
import { Recurrence } from '../types/recurrence'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { dailyIteratorResult } from './utils/stateless/daily-iterator'
import { monthlyIteratorResult } from './utils/stateless/monthly-iterators'
import { yearlyIteratorResult } from './utils/stateless/yearly-iterator'

export class RRule {
  private options: RRuleOptions
  private duration: Temporal.Duration | undefined
  private durationInDays: number | undefined

  constructor(
    options: RRuleOptionsExternal,
    private dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
    dtend?: Temporal.ZonedDateTime | Temporal.PlainDate
  ) {
    this.options = {
      ...options,
      interval: options.interval ?? 1,
    }

    const actualDTEND = dtend || dtstart /* RFC5545: #1 */

    if (this.isDateTime(this.dtstart) && this.isDateTime(actualDTEND)) {
      this.duration = getTemporalDuration(this.dtstart, actualDTEND)
    } else if (
      !this.isDateTime(this.dtstart) &&
      !this.isDateTime(actualDTEND)
    ) {
      this.durationInDays = calculateDaysDifference(this.dtstart, actualDTEND)
    } else {
      throw new Error('DTSTART and DTEND must share the same Temporal type')
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

  private getRecurrenceBasedOnStartDates(
    date: Temporal.ZonedDateTime | Temporal.PlainDate
  ): Recurrence {
    if (this.isDateTime(date)) {
      const duration = this.duration
      if (!duration) {
        throw new Error('Missing duration for timed recurrence')
      }
      const end = date.add(duration)
      return {
        start: date,
        end,
      }
    }

    const duration = this.durationInDays
    if (duration === undefined) {
      throw new Error('Missing duration in days for all-day recurrence')
    }
    const end = addDays(date, duration)
    if (!(end instanceof Temporal.PlainDate)) {
      throw new Error('Expected PlainDate end for all-day recurrence')
    }
    return {
      start: date,
      end,
    }
  }

  private isDateTime(
    date: Temporal.ZonedDateTime | Temporal.PlainDate
  ): date is Temporal.ZonedDateTime {
    return date instanceof Temporal.ZonedDateTime
  }
}
