import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

const dateFn = (dateTimeString: string, locale: string) => {
  const { year, month, date } = toIntegers(dateTimeString)

  return new Date(year, month, date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

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

  if (calendarEvent._isSingleDayFullDay) {
    return dateFn(calendarEvent.time!.start, locale)
  }

  if (calendarEvent._isMultiDayFullDay) {
    return `${dateFn(calendarEvent.time!.start, locale)} ${enDash} ${dateFn(
      calendarEvent.time!.end,
      locale
    )}`
  }

  if (calendarEvent._isSingleDayTimed) {
    return `${dateFn(calendarEvent.time!.start, locale)} ⋅ ${timeFn(
      calendarEvent.time!.start,
      locale
    )} ${enDash} ${timeFn(calendarEvent.time!.end, locale)}`
  }

  return `${dateFn(calendarEvent.time!.start, locale)}, ${timeFn(
    calendarEvent.time!.start,
    locale
  )} ${enDash} ${dateFn(calendarEvent.time!.end, locale)}, ${timeFn(
    calendarEvent.time!.end,
    locale
  )}`
}
