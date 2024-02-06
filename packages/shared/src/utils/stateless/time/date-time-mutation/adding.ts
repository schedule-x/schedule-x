import { toIntegers } from '../format-conversion/format-conversion'
import {
  toDateString,
  toDateTimeString,
} from '../format-conversion/date-to-strings'

export const addMonths = (to: string, nMonths: number): string => {
  const { year, month, date, hours, minutes } = toIntegers(to)
  const isDateTimeString = hours !== undefined && minutes !== undefined
  const jsDate = new Date(year, month, date, hours ?? 0, minutes ?? 0)
  jsDate.setMonth(jsDate.getMonth() + nMonths)

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
