import { doubleDigit } from '../date-time-mutation/double-digit'
import { Temporal } from 'temporal-polyfill'

export const toDateString = (date: Temporal.ZonedDateTime | Temporal.PlainDate): string => {
  return `${date.year}-${doubleDigit(
    date.month
  )}-${doubleDigit(date.day)}`
}

export const toTimeString = (date: Temporal.ZonedDateTime): string => {
  return `${doubleDigit(date.hour)}:${doubleDigit(date.minute)}`
}

export const toDateTimeString = (date: Temporal.ZonedDateTime): string => {
  return `${toDateString(date)} ${toTimeString(date)}`
}
