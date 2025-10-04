import { RRuleOptions, RRuleOptionsExternal } from './types/rrule-options'
import { getDurationInMinutesTemporal } from './utils/stateless/duration-in-minutes'
import { weeklyIteratorResult } from './utils/stateless/weekly-iterator'
import { RRuleFreq } from './enums/rrule-freq'
import { Recurrence } from '../types/recurrence'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import {
  addMinutesToTemporal,
  addDays,
} from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { dailyIteratorResult } from './utils/stateless/daily-iterator'
import { monthlyIteratorResult } from './utils/stateless/monthly-iterators'
import { yearlyIteratorResult } from './utils/stateless/yearly-iterator'

export class RRule {
  private options: RRuleOptions
  private durationInMinutes: number | undefined
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
      this.durationInMinutes = getDurationInMinutesTemporal(
        this.dtstart,
        actualDTEND
      )
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
      const duration = this.durationInMinutes
      if (duration === undefined) {
        throw new Error('Missing duration in minutes for timed recurrence')
      }
      const end = addMinutesToTemporal(date, duration)
      if (!(end instanceof Temporal.ZonedDateTime)) {
        throw new Error('Expected ZonedDateTime end for timed recurrence')
      }
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
