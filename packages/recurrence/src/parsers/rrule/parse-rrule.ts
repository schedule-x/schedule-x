import { RRuleOptionsExternal } from '../../rrule/types/rrule-options'
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
    if (key === 'BYMONTHDAY') rruleOptions.bymonthday = Number(value)
    if (key === 'UNTIL') rruleOptions.until = parseRFC5545ToSX(value)
    if (key === 'COUNT') rruleOptions.count = Number(value)
    if (key === 'INTERVAL') rruleOptions.interval = Number(value)
  })

  return rruleOptions
}

export const rruleJSToString = (rruleOptions: RRuleOptionsExternal): string => {
  let rrule = `FREQ=${rruleOptions.freq}`

  if (rruleOptions.until)
    rrule += `;UNTIL=${parseSXToRFC5545(rruleOptions.until)}`
  if (rruleOptions.count) rrule += `;COUNT=${rruleOptions.count}`
  if (rruleOptions.interval) rrule += `;INTERVAL=${rruleOptions.interval}`
  if (rruleOptions.byday) rrule += `;BYDAY=${rruleOptions.byday.join(',')}`
  if (rruleOptions.bymonthday) rrule += `;BYMONTHDAY=${rruleOptions.bymonthday}`

  return rrule
}

export const parseSXToRFC5545 = (datetime: string): string => {
  datetime = datetime.replace(/-/g, '')
  datetime = datetime.replace(/:/g, '')
  datetime = datetime.replace(' ', 'T')
  if (/T\d{4}$/.test(datetime)) datetime += '00' // add seconds if not present

  return datetime
}

export const parseRFC5545ToSX = (datetime: string): string => {
  datetime = datetime.replace('T', ' ')
  datetime = datetime.replace(/^(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
  datetime = datetime.replace(/(\d{2})(\d{2})(\d{2})$/, '$1:$2')

  return datetime
}
