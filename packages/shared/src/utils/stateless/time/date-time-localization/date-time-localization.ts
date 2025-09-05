export const toLocalizedMonth = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  locale: string,
  calendarSystem: 'gregorian' | 'hebrew'
): string => {
  return date.toLocaleString(locale, { month: 'long', calendar: calendarSystem })
}

export const toLocalizedDate = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const toLocalizedDateString = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  locale: string,
  calendarSystem: 'gregorian' | 'hebrew'
): string => {
  return date.toLocaleString(locale, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    calendar: calendarSystem
  })
}

export const getOneLetterDayNames = (
  week: Temporal.ZonedDateTime[] | Temporal.PlainDate[],
  locale: string,
  calendarSystem: 'gregorian' | 'hebrew'
): string[] => {
  return week.map((date) => {
    return date.toLocaleString(locale, { weekday: 'short', calendar: calendarSystem }).charAt(0)
  })
}

export const getDayNameShort = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  locale: string,
  calendarSystem: 'gregorian' | 'hebrew'
) => {
  if (locale === 'he-IL') {
    return date.toLocaleString(locale, { weekday: 'narrow', calendar: calendarSystem })
  }

  return date.toLocaleString(locale, { weekday: 'short', calendar: calendarSystem })
}

export const getDayNamesShort = (
  week: Temporal.ZonedDateTime[] | Temporal.PlainDate[],
  locale: string,
  calendarSystem: 'gregorian' | 'hebrew'
): string[] => {
  return week.map((date) => getDayNameShort(date, locale, calendarSystem))
}

export const getOneLetterOrShortDayNames = (
  week: Temporal.ZonedDateTime[] | Temporal.PlainDate[],
  locale: string,
  calendarSystem: 'gregorian' | 'hebrew'
): string[] => {
  if (['zh-cn', 'zh-tw', 'ca-es', 'he-il'].includes(locale.toLowerCase())) {
    return getDayNamesShort(week, locale, calendarSystem)
  }

  return getOneLetterDayNames(week, locale, calendarSystem)
}
