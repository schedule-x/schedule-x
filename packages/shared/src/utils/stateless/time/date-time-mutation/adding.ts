import { toIntegers } from '../format-conversion/format-conversion'
import {
  toDateString,
  toDateTimeString,
} from '../format-conversion/date-to-strings'
import { Temporal } from 'temporal-polyfill'

export const addMonths = (to: Temporal.ZonedDateTime | Temporal.PlainDate, nMonths: number): Temporal.ZonedDateTime | Temporal.PlainDate => {
  return to.add({ months: nMonths })
}

export const addDays = (to: Temporal.ZonedDateTime | Temporal.PlainDate, nDays: number): Temporal.ZonedDateTime | Temporal.PlainDate => {
  return to.add({ days: nDays })
}

export const addMinutes = (to: string, nMinutes: number): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)
  jsDate.setMinutes(jsDate.getMinutes() + nMinutes)

  if (isDateTimeString) {
    return toDateTimeString(jsDate)
  }

  return toDateString(jsDate)
}

export const addYears = (to: string, nYears: number): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)
  jsDate.setFullYear(jsDate.getFullYear() + nYears)

  if (isDateTimeString) {
    return toDateTimeString(jsDate)
  }

  return toDateString(jsDate)
}
