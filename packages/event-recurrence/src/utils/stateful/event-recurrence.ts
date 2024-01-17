import { Weekday } from 'rrule/dist/esm/weekday'
import { ByWeekday, Frequency } from 'rrule/dist/esm/types'
import { datetime, RRule as RRuleJS } from 'rrule'
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

export class EventRecurrence {
  constructor(public options: Partial<Options>) {}

  _createRRule(dtstart: Date) {
    const { year, month, date } = toIntegers(this.options.until!)

    return new RRuleJS({
      ...this.options,
      dtstart,
      until: datetime(year, month + 1, date),
    })
  }
}

export const RRule = RRuleJS
