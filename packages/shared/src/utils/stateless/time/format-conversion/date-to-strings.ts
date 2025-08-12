import { doubleDigit } from '../date-time-mutation/double-digit'

export const toDateString = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate
): string => {
  return `${date.year}-${doubleDigit(date.month)}-${doubleDigit(date.day)}`
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

/**
 * @deprecated
 *
 * was kept during Temporal migration, to reduce risk in recurrence package, which internally still uses non-Temporal formats
 */
export const __deprecated__jsDateToDateString = (date: Date): string => {
  return `${date.getFullYear()}-${doubleDigit(
    date.getMonth() + 1
  )}-${doubleDigit(date.getDate())}`
}

/**
 * @deprecated
 *
 * was kept during Temporal migration, to reduce risk in recurrence package, which internally still uses non-Temporal formats
 */
export const __deprecated__jsDatetToDateTimeString = (date: Date): string => {
  return `${__deprecated__jsDateToDateString(date)} ${jsDateToTimeString(date)}`
}
