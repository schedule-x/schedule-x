import { doubleDigit } from '../date-time-mutation/date-time-mutation.ts'

export const toDateString = (date: Date): string => {
  return `${date.getFullYear()}-${doubleDigit(
    date.getMonth() + 1
  )}-${doubleDigit(date.getDate())}`
}

export const toTimeString = (date: Date): string => {
  return `${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}`
}

export const toDateTimeString = (date: Date): string => {
  return `${toDateString(date)} ${toTimeString(date)}`
}
