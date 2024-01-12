import { toIntegers } from '../format-conversion/format-conversion'
import { CalendarEventInternal } from '../../../../interfaces/calendar/calendar-event.interface'

const dateFn = (dateTimeString: string, locale: string) => {
  const { year, month, date } = toIntegers(dateTimeString)

  return new Date(year, month, date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const getLocalizedDate = dateFn

const timeFn = (dateTimeString: string, locale: string) => {
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
  locale: string
) => {
  const enDash = '\u2013'
  const eventTime = { start: calendarEvent.start, end: calendarEvent.end } as {
    start: string
    end: string
  }

  if (calendarEvent._isSingleDayFullDay) {
    return dateFn(eventTime.start, locale)
  }

  if (calendarEvent._isMultiDayFullDay) {
    return `${dateFn(eventTime.start, locale)} ${enDash} ${dateFn(
      eventTime.end,
      locale
    )}`
  }

  if (calendarEvent._isSingleDayTimed) {
    return `${dateFn(eventTime.start, locale)} ⋅ ${timeFn(
      eventTime.start,
      locale
    )} ${enDash} ${timeFn(eventTime.end, locale)}`
  }

  return `${dateFn(eventTime.start, locale)}, ${timeFn(
    eventTime.start,
    locale
  )} ${enDash} ${dateFn(eventTime.end, locale)}, ${timeFn(
    eventTime.end,
    locale
  )}`
}
