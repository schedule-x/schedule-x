import { Weekday } from 'rrule/dist/esm/weekday'
import { ByWeekday, Frequency } from 'rrule/dist/esm/types'
import { datetime, RRule, RRuleSet } from 'rrule'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

export interface Options {
  freq: Frequency
  interval: number
  wkst: Weekday | number | null
  count: number | null
  until: string | null
  tzid: string | null
  bysetpos: number | number[] | null
  bymonth: number | number[] | null
  bymonthday: number | number[] | null
  bynmonthday: number[] | null
  byyearday: number | number[] | null
  byweekno: number | number[] | null
  byweekday: ByWeekday | ByWeekday[] | null
  bynweekday: number[][] | null
  byhour: number | number[] | null
  byminute: number | number[] | null
  bysecond: number | number[] | null
  byeaster: number | null
}

export class EventRRule {
  constructor(public options: Partial<Options>) {}

  _createRecurrenceSet(dtstart: Date) {
    const rrset = new RRuleSet()
    rrset.rrule(
      new RRule({
        ...this.options,
        dtstart,
        until: this.getUntil(),
      })
    )

    return rrset
  }

  private getUntil() {
    if (typeof this.options.until !== 'string') return null

    const { year, month, date } = toIntegers(this.options.until)
    return datetime(year, month + 1, date)
  }
}

export const RRValues = RRule
