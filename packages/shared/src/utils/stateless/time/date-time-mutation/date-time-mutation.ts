import { addMonths } from './adding'
import { toDateString } from '../format-conversion/date-to-strings'
import { jsDateToDateString } from '../format-conversion/date-to-strings'
import { toJSDate } from '../format-conversion/format-conversion'
import { timeFromDateTime } from '../format-conversion/string-to-string'
import { doubleDigit } from './double-digit'
import { Temporal } from 'temporal-polyfill'

export const setDateOfMonth = (dateString: string, date: number): string => {
  dateString = dateString.slice(0, 8) + doubleDigit(date) + dateString.slice(10)

  return dateString
}

export const getFirstDayOPreviousMonth = (date: Temporal.PlainDate): Temporal.PlainDate => {
  return addMonths(date, -1) as Temporal.PlainDate
}

export const getFirstDayOfNextMonth = (date: Temporal.PlainDate): Temporal.PlainDate => {
  const nextMonth = addMonths(date, 1)
  return nextMonth.with({ day: 1 }) as Temporal.PlainDate
}

export const setTimeInDateTimeString = (
  dateTimeString: string,
  newTime: string
): string => {
  const dateCache = jsDateToDateString(toJSDate(dateTimeString))

  return `${dateCache} ${newTime}`
}

export const setDateInDateTime = (
  dateTime: Temporal.ZonedDateTime,
  newDate: Temporal.ZonedDateTime
): Temporal.ZonedDateTime => {
  const updatedDateTime = dateTime.with({
    year: newDate.year, 
    month: newDate.month,
    day: newDate.day,
  })

  return updatedDateTime
}
