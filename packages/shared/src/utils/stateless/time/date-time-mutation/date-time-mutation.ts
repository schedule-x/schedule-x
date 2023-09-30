import { addMonths } from './adding'
import { toDateString } from '../format-conversion/date-to-strings'
import { toJSDate } from '../format-conversion/format-conversion'
import { timeFromDateTime } from '../format-conversion/string-to-string'
import { doubleDigit } from './double-digit'

export const setDateOfMonth = (dateString: string, date: number): string => {
  dateString = dateString.slice(0, 8) + doubleDigit(date) + dateString.slice(10)

  return dateString
}

export const getFirstDayOPreviousMonth = (dateString: string): string => {
  dateString = addMonths(dateString, -1)
  return setDateOfMonth(dateString, 1)
}

export const getFirstDayOfNextMonth = (dateString: string): string => {
  dateString = addMonths(dateString, 1)
  return setDateOfMonth(dateString, 1)
}

export const setTimeInDateTimeString = (
  dateTimeString: string,
  newTime: string
): string => {
  const dateCache = toDateString(toJSDate(dateTimeString))

  return `${dateCache} ${newTime}`
}

export const setDateInDateTimeString = (
  dateTimeString: string,
  newDate: string
): string => {
  const timeCache = timeFromDateTime(dateTimeString)

  return `${newDate} ${timeCache}`
}
