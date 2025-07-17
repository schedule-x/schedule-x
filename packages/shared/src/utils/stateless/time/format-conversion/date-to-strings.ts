import { doubleDigit } from '../date-time-mutation/double-digit'


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

export const jsDateToTimeString = (date: Date): string => {
  return `${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}`
}

export const jsDateToDateString = (date: Date): string => {
  return `${date.getFullYear()}-${doubleDigit(
    date.getMonth() + 1
  )}-${doubleDigit(date.getDate())}`
}

export const jsDatetToDateTimeString = (date: Date): string => {
  return `${jsDateToDateString(date)} ${jsDateToTimeString(date)}`
}
