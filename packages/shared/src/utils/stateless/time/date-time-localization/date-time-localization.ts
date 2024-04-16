import { translate, translations } from '@schedule-x/translations/src'

export const toLocalizedMonth = (date: Date, locale: string): string => {
  const language = translate(locale, translations)

  if (language('monthsName') === 'monthsName') {
    return date.toLocaleString(locale, { month: 'long' })
  }
  return language('monthsName')[date.getMonth()]
}

export const toLocalizedDate = (date: Date, locale: string): string => {
  const language = translate(locale, translations)

  if (language('monthsName') === 'monthsName') {
    return date.toLocaleString(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }
  return `${date.getDay()} ${toLocalizedMonth(date, locale)} ${date.getFullYear()}`
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
  const language = translate(locale, translations)

  if (language('monthsName') === 'monthsName') {
    return week.map((date) => {
      return date.toLocaleString(locale, { weekday: 'short' }).charAt(0)
    })
  }
  return week.map((date) => {
    return language('weekdaysName')[date.getDay()].charAt(0)
  })
}

export const getDayNameShort = (date: Date, locale: string) => {
  const language = translate(locale, translations)

  if (language('monthsName') === 'monthsName') {
    return date.toLocaleString(locale, { weekday: 'short' })
  }
  return language('weekdaysName')[date.getDay()].slice(0, 3)
}

export const getDayNamesShort = (week: Date[], locale: string): string[] => {
  return week.map((date) => getDayNameShort(date, locale))
}

export const getOneLetterOrShortDayNames = (
  week: Date[],
  locale: string
): string[] => {
  if (['zh-cn'].includes(locale.toLowerCase())) {
    return getDayNamesShort(week, locale)
  }

  return getOneLetterDayNames(week, locale)
}
