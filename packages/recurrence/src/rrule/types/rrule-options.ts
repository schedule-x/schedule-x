import { RRuleFreq } from '../enums/rrule-freq'

export type RFC5455Weekday = 'SU' | 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA'

export interface RRuleOptions {
  freq: RRuleFreq
  interval: number
  until?: Temporal.ZonedDateTime | Temporal.PlainDate
  untilHasUtcDesignator?: boolean
  count?: number
  byday?: string[]
  bymonthday?: number
  bymonth?: number
  wkst?: RFC5455Weekday
}

export interface RRuleOptionsExternal extends Omit<RRuleOptions, 'interval'> {
  interval?: number
}
