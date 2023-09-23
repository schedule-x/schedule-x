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
