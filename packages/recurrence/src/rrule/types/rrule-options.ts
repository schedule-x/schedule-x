import { RRuleFreq } from '../enums/rrule-freq'

export interface RRuleOptions {
  freq: RRuleFreq
  interval: number
  until?: string
  count?: number
  byday?: string[]
  bymonthday?: number
}

export interface RRuleOptionsExternal extends Omit<RRuleOptions, 'interval'> {
  interval?: number
}
