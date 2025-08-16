import { addMonths } from './adding'
import { __deprecated__jsDateToDateString } from '../format-conversion/date-to-strings'
import { toJSDate } from '../format-conversion/format-conversion'

export const getFirstDayOPreviousMonth = (
  date: Temporal.PlainDate
): Temporal.PlainDate => {
  return addMonths(date, -1).with({ day: 1 }) as Temporal.PlainDate
}

export const getFirstDayOfNextMonth = (
  date: Temporal.PlainDate
): Temporal.PlainDate => {
  const nextMonth = addMonths(date, 1)
  return nextMonth.with({ day: 1 }) as Temporal.PlainDate
}

export const setTimeInDateTimeString = (
  dateTimeString: string,
  newTime: string
): string => {
  const dateCache = __deprecated__jsDateToDateString(toJSDate(dateTimeString))

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
