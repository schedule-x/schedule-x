import { doubleDigit } from '../date-time-mutation/double-digit'
import { Temporal } from 'temporal-polyfill'

export const toDateString = (date: Temporal.ZonedDateTime): string => {
  return `${date.year}-${doubleDigit(
    date.month
  )}-${doubleDigit(date.day)}`
}

export const toTimeString = (date: Date): string => {
  return `${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}`
}

export const toDateTimeString = (date: Date): string => {
  return `${toDateString(date)} ${toTimeString(date)}`
}
