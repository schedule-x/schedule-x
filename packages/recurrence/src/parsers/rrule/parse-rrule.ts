import {
  RRuleOptions,
  RRuleOptionsExternal,
} from '../../rrule/types/rrule-options'
import { RRuleFreq } from '../../rrule/enums/rrule-freq'

export const rruleStringToJS = (rrule: string): RRuleOptionsExternal => {
  const rruleOptions: RRuleOptionsExternal = {
    freq: RRuleFreq.WEEKLY,
  }

  const rruleOptionsArray = rrule.split(';')
  rruleOptionsArray.forEach((option) => {
    const [key, value] = option.split('=')

    if (key === 'FREQ') rruleOptions.freq = value as RRuleFreq
    if (key === 'BYDAY') rruleOptions.byday = value.split(',')
    if (key === 'UNTIL') rruleOptions.until = value
    if (key === 'COUNT') rruleOptions.count = Number(value)
    if (key === 'INTERVAL') rruleOptions.interval = Number(value)
  })

  return rruleOptions
}

export const rruleJSToString = (rruleOptions: RRuleOptionsExternal): string => {
  let rrule = `FREQ=${rruleOptions.freq}`

  if (rruleOptions.until) rrule += `;UNTIL=${rruleOptions.until}`
  if (rruleOptions.count) rrule += `;COUNT=${rruleOptions.count}`
  if (rruleOptions.interval) rrule += `;INTERVAL=${rruleOptions.interval}`
  if (rruleOptions.byday) rrule += `;BYDAY=${rruleOptions.byday.join(',')}`

  return rrule
}
