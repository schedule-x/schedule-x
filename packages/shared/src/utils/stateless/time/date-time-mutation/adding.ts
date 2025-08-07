import { toIntegers } from '../format-conversion/format-conversion'
import {
  jsDateToDateString,
  jsDatetToDateTimeString,
} from '../format-conversion/date-to-strings'

export const addMonths = (
  to: Temporal.ZonedDateTime | Temporal.PlainDate,
  nMonths: number
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  if (nMonths < 0) {
    return to.subtract({ months: -nMonths })
  }

  return to.add({ months: nMonths })
}

export const addDays = (
  to: Temporal.ZonedDateTime | Temporal.PlainDate,
  nDays: number
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  if (nDays < 0) {
    return to.subtract({ days: -nDays })
  }

  return to.add({ days: nDays })
}

export const addMinutes = (to: string, nMinutes: number): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)
  jsDate.setMinutes(jsDate.getMinutes() + nMinutes)

  if (isDateTimeString) {
    return jsDatetToDateTimeString(jsDate)
  }

  return jsDateToDateString(jsDate)
}

export const addMinutesToTemporal = (
  to: Temporal.ZonedDateTime | Temporal.PlainDate,
  nMinutes: number
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  if (nMinutes < 0) {
    return to.subtract({ minutes: -nMinutes })
  }

  return to.add({ minutes: nMinutes })
}

export const addYears = (to: string, nYears: number): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)
  jsDate.setFullYear(jsDate.getFullYear() + nYears)

  if (isDateTimeString) {
    return jsDatetToDateTimeString(jsDate)
  }

  return jsDateToDateString(jsDate)
}

export const addDaysToDateOrDateTime = (to: string, nDays: number): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)
  jsDate.setDate(jsDate.getDate() + nDays)

  if (isDateTimeString) {
    return jsDatetToDateTimeString(jsDate)
  }

  return jsDateToDateString(jsDate)
}

export const addMonthsToDateOrDatetime = (
  to: string,
  nMonths: number
): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)

  let expectedMonth = (jsDate.getMonth() + nMonths) % 12
  if (expectedMonth < 0) expectedMonth += 12
  jsDate.setMonth(jsDate.getMonth() + nMonths)

  // handle date overflow and underflow
  if (jsDate.getMonth() > expectedMonth) {
    jsDate.setDate(0)
  } else if (jsDate.getMonth() < expectedMonth) {
    jsDate.setMonth(jsDate.getMonth() + 1)
    jsDate.setDate(0)
  }

  if (isDateTimeString) {
    return jsDatetToDateTimeString(jsDate)
  }

  return jsDateToDateString(jsDate)
}
