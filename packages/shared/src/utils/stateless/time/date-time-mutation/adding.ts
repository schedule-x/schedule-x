import { toIntegers } from '../format-conversion/format-conversion'
import {
  toDateString,
  toDateTimeString,
} from '../format-conversion/date-to-strings'

export const addMonths = (to: string, nMonths: number): string => {
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
    return toDateTimeString(jsDate)
  }

  return toDateString(jsDate)
}

export const addDays = (to: string, nDays: number): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)
  jsDate.setDate(jsDate.getDate() + nDays)

  if (isDateTimeString) {
    return toDateTimeString(jsDate)
  }

  return toDateString(jsDate)
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
