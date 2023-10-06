import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

const dateFn = (dateTimeString: string, locale: string) => {
  return new Date(dateTimeString).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const timeFn = (dateTimeString: string, locale: string) => {
  return new Date(dateTimeString).toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
  })
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
