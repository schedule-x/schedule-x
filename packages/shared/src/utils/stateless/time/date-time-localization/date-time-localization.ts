export const toLocalizedMonth = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, { month: 'long' })
}

export const toLocalizedDate = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const toLocalizedDateString = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getOneLetterDayNames = (
  week: Date[],
  locale: string
): string[] => {
  return week.map((date) => {
    return date.toLocaleString(locale, { weekday: 'short' }).charAt(0)
  })
}

export const getDayNameShort = (date: Date, locale: string) =>
  date.toLocaleString(locale, { weekday: 'short' })

export const getDayNamesShort = (week: Date[], locale: string): string[] => {
  return week.map((date) => getDayNameShort(date, locale))
}

export const getOneLetterOrShortDayNames = (
  week: Date[],
  locale: string
): string[] => {
  if (['zh-cn', 'zh-tw', 'ca-es'].includes(locale.toLowerCase())) {
    return getDayNamesShort(week, locale)
  }

  return getOneLetterDayNames(week, locale)
}
