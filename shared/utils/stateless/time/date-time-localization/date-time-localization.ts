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

export const getDayNamesShort = (week: Date[], locale: string): string[] => {
  return week.map((date) => {
    return date.toLocaleString(locale, { weekday: 'short' })
  })
}
