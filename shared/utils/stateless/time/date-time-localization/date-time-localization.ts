export const toLocalizedMonth = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, { month: 'long' })
}

export const getOneLetterDayNames = (
  week: Date[],
  locale: string
): string[] => {
  return week.map((date) => {
    return date.toLocaleString(locale, { weekday: 'short' }).charAt(0)
  })
}
