import { NumberRangeError } from '../../errors/number-range.error'
import { addMonths } from './adding'
import { toDateString } from '../format-conversion/date-to-strings'
import { toJSDate } from '../format-conversion/format-conversion'

export const doubleDigit = (number: number): string => {
  if (number < 0 || number > 99) throw new NumberRangeError(0, 99)

  return String(number).padStart(2, '0')
}

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
  const date = toDateString(toJSDate(dateTimeString))

  return `${date} ${newTime}`
}
