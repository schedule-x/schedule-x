import { CalendarEventInternal } from '../../../../interfaces/calendar/calendar-event.interface'

import { toIntegers } from '../format-conversion/format-conversion'

const dateFn = (
  dateTime: Temporal.ZonedDateTime | Temporal.PlainDate,
  locale: string
) => {
  return dateTime.toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const getLocalizedDate = dateFn

export const timeFn = (dateTime: Temporal.ZonedDateTime, locale: string) => {
  const dateTimeString = dateTime.toString()
  const { year, month, date, hours, minutes } = toIntegers(dateTimeString)

  return new Date(year, month, date, hours, minutes).toLocaleTimeString(
    locale,
    {
      hour: 'numeric',
      minute: 'numeric',
    }
  )
}

export const getTimeStamp = (
  calendarEvent: Partial<CalendarEventInternal>, // to facilitate testing. In reality, we will always have a full CalendarEventInternal
  locale: string,
  delimiter = '\u2013'
) => {
  const eventTime = { start: calendarEvent.start, end: calendarEvent.end } as {
    start: Temporal.ZonedDateTime | Temporal.PlainDate
    end: Temporal.ZonedDateTime | Temporal.PlainDate
  }

  if (calendarEvent._isSingleDayFullDay) {
    return dateFn(eventTime.start, locale)
  }

  if (calendarEvent._isMultiDayFullDay) {
    return `${dateFn(eventTime.start, locale)} ${delimiter} ${dateFn(
      eventTime.end,
      locale
    )}`
  }

  if (
    calendarEvent._isSingleDayTimed &&
    eventTime.start?.toString() !== eventTime.end?.toString()
  ) {
    return `${dateFn(eventTime.start, locale)} <span aria-hidden="true">⋅</span> ${timeFn(
      eventTime.start as Temporal.ZonedDateTime,
      locale
    )} ${delimiter} ${timeFn(eventTime.end as Temporal.ZonedDateTime, locale)}`
  }

  if (
    calendarEvent._isSingleDayTimed &&
    calendarEvent.start?.toString() === calendarEvent.end?.toString()
  ) {
    return `${dateFn(eventTime.start, locale)}, ${timeFn(
      eventTime.start as Temporal.ZonedDateTime,
      locale
    )}`
  }

  return `${dateFn(eventTime.start, locale)}, ${timeFn(
    eventTime.start as Temporal.ZonedDateTime,
    locale
  )} ${delimiter} ${dateFn(eventTime.end, locale)}, ${timeFn(
    eventTime.end as Temporal.ZonedDateTime,
    locale
  )}`
}
