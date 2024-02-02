import { RRuleFreq } from '../enums/rrule-freq'

export interface RRuleOptions {
  freq: RRuleFreq
  interval: number
  until?: string
  byday?: string[]
  count?: number
}

export interface RRuleOptionsExternal extends Omit<RRuleOptions, 'interval'> {
  interval?: number
}
