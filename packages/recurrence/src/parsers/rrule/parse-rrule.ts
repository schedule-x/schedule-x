import {
  RFC5455Weekday,
  RRuleOptionsExternal,
} from '../../rrule/types/rrule-options'
import { RRuleFreq } from '../../rrule/enums/rrule-freq'
import { rfc5455Weekdays } from '../../utils/weekdays'

import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

export const rruleStringToJS = (
  rrule: string,
  timezone: IANATimezone = 'UTC'
): RRuleOptionsExternal => {
  const rruleOptions: RRuleOptionsExternal = {
    freq: RRuleFreq.WEEKLY,
  }

  const rruleOptionsArray = rrule.split(';')
  rruleOptionsArray.forEach((option) => {
    const [key, value] = option.split('=')

    if (key === 'FREQ') rruleOptions.freq = value as RRuleFreq
    if (key === 'BYDAY') rruleOptions.byday = value.split(',')
    if (key === 'BYMONTHDAY') rruleOptions.bymonthday = Number(value)
    if (key === 'UNTIL')
      rruleOptions.until = parseRFC5545ToTemporal(value, timezone)
    if (key === 'COUNT') rruleOptions.count = Number(value)
    if (key === 'INTERVAL') rruleOptions.interval = Number(value)
    if (key === 'WKST') {
      if (!rfc5455Weekdays.includes(value as unknown as RFC5455Weekday)) {
        throw new Error(`Invalid WKST value: ${value}`)
      }
      rruleOptions.wkst = value as RFC5455Weekday
    }
  })

  return rruleOptions
}

export const rruleJSToString = (rruleOptions: RRuleOptionsExternal): string => {
  let rrule = `FREQ=${rruleOptions.freq}`

  if (rruleOptions.until)
    rrule += `;UNTIL=${parseTemporalToRFC5545(rruleOptions.until)}`
  if (rruleOptions.count) rrule += `;COUNT=${rruleOptions.count}`
  if (rruleOptions.interval) rrule += `;INTERVAL=${rruleOptions.interval}`
  if (rruleOptions.byday) rrule += `;BYDAY=${rruleOptions.byday.join(',')}`
  if (rruleOptions.bymonthday) rrule += `;BYMONTHDAY=${rruleOptions.bymonthday}`
  if (rruleOptions.wkst) rrule += `;WKST=${rruleOptions.wkst}`

  return rrule
}

export const parseTemporalToRFC5545 = (
  dateOrDatetime: Temporal.ZonedDateTime | Temporal.PlainDate
): string => {
  const year = dateOrDatetime.year.toString().padStart(4, '0')
  const month = dateOrDatetime.month.toString().padStart(2, '0')
  const day = dateOrDatetime.day.toString().padStart(2, '0')

  if (dateOrDatetime instanceof Temporal.ZonedDateTime) {
    const hour = dateOrDatetime.hour.toString().padStart(2, '0')
    const minute = dateOrDatetime.minute.toString().padStart(2, '0')
    const second = dateOrDatetime.second.toString().padStart(2, '0')

    return `${year}${month}${day}T${hour}${minute}${second}`
  }

  if (dateOrDatetime instanceof Temporal.PlainDate) {
    return `${year}${month}${day}`
  }

  throw new Error(`Invalid datetime format: ${dateOrDatetime}`)
}

export const parseRFC5545ToTemporal = (
  dateOrDatetime: string,
  timezone: IANATimezone
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  if (dateOrDatetime.length === 16 && dateOrDatetime.endsWith('Z')) {
    // given YYYYMMDDThhmmssZ format (UTC)
    const year = dateOrDatetime.substring(0, 4)
    const month = dateOrDatetime.substring(4, 6)
    const day = dateOrDatetime.substring(6, 8)
    const hour = dateOrDatetime.substring(9, 11)
    const minute = dateOrDatetime.substring(11, 13)
    const second = dateOrDatetime.substring(13, 15)

    return Temporal.ZonedDateTime.from({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: parseInt(second),
      timeZone: 'UTC',
    })
  }

  if (dateOrDatetime.length === 15) {
    // given YYYYMMDDThhmmss format
    const year = dateOrDatetime.substring(0, 4)
    const month = dateOrDatetime.substring(4, 6)
    const day = dateOrDatetime.substring(6, 8)
    const hour = dateOrDatetime.substring(9, 11)
    const minute = dateOrDatetime.substring(11, 13)
    const second = dateOrDatetime.substring(13, 15)

    return Temporal.ZonedDateTime.from({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: parseInt(second),
      timeZone: timezone,
    })
  }

  if (dateOrDatetime.length === 8) {
    // given YYYYMMDD format
    const year = dateOrDatetime.substring(0, 4)
    const month = dateOrDatetime.substring(4, 6)
    const day = dateOrDatetime.substring(6, 8)

    return Temporal.PlainDate.from({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    })
  }

  throw new Error(`Invalid RFC5545 format: ${dateOrDatetime}`)
}
