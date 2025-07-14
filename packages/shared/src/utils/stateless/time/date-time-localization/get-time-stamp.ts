import { CalendarEventInternal } from '../../../../interfaces/calendar/calendar-event.interface'
import { Temporal } from 'temporal-polyfill'
import { toIntegers } from '../format-conversion/format-conversion'

const dateFn = (dateTime: Temporal.ZonedDateTime, locale: string) => {
  return dateTime.toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const getLocalizedDate = dateFn

export const timeFn = (dateTimeString: string, locale: string) => {
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
    start: string
    end: string
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

  if (calendarEvent._isSingleDayTimed && eventTime.start !== eventTime.end) {
    return `${dateFn(eventTime.start, locale)} <span aria-hidden="true">⋅</span> ${timeFn(
      eventTime.start,
      locale
    )} ${delimiter} ${timeFn(eventTime.end, locale)}`
  }

  if (
    calendarEvent._isSingleDayTimed &&
    calendarEvent.start === calendarEvent.end
  ) {
    return `${dateFn(eventTime.start, locale)}, ${timeFn(
      eventTime.start,
      locale
    )}`
  }

  return `${dateFn(eventTime.start, locale)}, ${timeFn(
    eventTime.start,
    locale
  )} ${delimiter} ${dateFn(eventTime.end, locale)}, ${timeFn(
    eventTime.end,
    locale
  )}`
}
