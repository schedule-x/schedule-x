import { DateFormats } from '../../../../values/date-formats'
import { InvalidDateTimeError } from '../../errors/invalid-date-time.error'

export const toJSDate = (dateTimeSpecification: string): Date => {
  if (
    !DateFormats.DATE_TIME_STRING.test(dateTimeSpecification) &&
    !DateFormats.DATE_STRING.test(dateTimeSpecification)
  )
    throw new InvalidDateTimeError(dateTimeSpecification)

  return new Date(
    Number(dateTimeSpecification.slice(0, 4)),
    Number(dateTimeSpecification.slice(5, 7)) - 1,
    Number(dateTimeSpecification.slice(8, 10)),
    Number(dateTimeSpecification.slice(11, 13)), // for date strings this will be 0
    Number(dateTimeSpecification.slice(14, 16)) // for date strings this will be 0
  )
}

export const toJSDateUTC = (dateTimeSpecification: string): Date => {
  if (
    !DateFormats.DATE_TIME_STRING.test(dateTimeSpecification) &&
    !DateFormats.DATE_STRING.test(dateTimeSpecification)
  )
    throw new InvalidDateTimeError(dateTimeSpecification)

  const { year, month, date, hours, minutes } = toIntegers(
    dateTimeSpecification
  )

  return new Date(
    Date.UTC(
      year,
      month,
      date,
      hours || 0, // for date strings this will be 0
      minutes || 0 // for date strings this will be 0
    )
  )
}

type DateTimeVariables = {
  year: number
  month: number
  date: number
  hours: number | undefined
  minutes: number | undefined
}

export const toIntegers = (
  dateTimeSpecification: string
): DateTimeVariables => {
  const hours = dateTimeSpecification.slice(11, 13),
    minutes = dateTimeSpecification.slice(14, 16)

  return {
    year: Number(dateTimeSpecification.slice(0, 4)),
    month: Number(dateTimeSpecification.slice(5, 7)) - 1,
    date: Number(dateTimeSpecification.slice(8, 10)),
    hours: hours !== '' ? Number(hours) : undefined,
    minutes: minutes !== '' ? Number(minutes) : undefined,
  }
}
