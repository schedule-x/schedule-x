import { Temporal } from 'temporal-polyfill'

export const toLocalizedMonth = (date: Temporal.ZonedDateTime, locale: string): string => {
  return date.toLocaleString(locale, { month: 'long' })
}

export const toLocalizedDate = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const toLocalizedDateString = (date: Temporal.ZonedDateTime, locale: string): string => {
  return date.toLocaleString(locale, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getOneLetterDayNames = (
  week: Temporal.ZonedDateTime[] | Temporal.PlainDate[],
  locale: string
): string[] => {
  return week.map((date) => {
    return date.toLocaleString(locale, { weekday: 'short' }).charAt(0)
  })
}

export const getDayNameShort = (date: Temporal.ZonedDateTime | Temporal.PlainDate, locale: string) => {
  if (locale === 'he-IL') {
    return date.toLocaleString(locale, { weekday: 'narrow' })
  }

  return date.toLocaleString(locale, { weekday: 'short' })
}

export const getDayNamesShort = (week: Temporal.ZonedDateTime[] | Temporal.PlainDate[], locale: string): string[] => {
  return week.map((date) => getDayNameShort(date, locale))
}

export const getOneLetterOrShortDayNames = (
  week: Temporal.ZonedDateTime[] | Temporal.PlainDate[],
  locale: string
): string[] => {
  if (['zh-cn', 'zh-tw', 'ca-es', 'he-il'].includes(locale.toLowerCase())) {
    return getDayNamesShort(week, locale)
  }

  return getOneLetterDayNames(week, locale)
}
