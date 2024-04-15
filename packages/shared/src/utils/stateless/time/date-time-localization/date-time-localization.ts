export const toLocalizedMonth = (date: Date, locale: string): string => {
  if (locale === 'ky-KG') {
    // ky-KG has no support in chrome since has to opt for ru-RU lang as options as it's 99% readable in KG region
    return date.toLocaleString('ru-RU', { month: 'long' })
  }
  return date.toLocaleString(locale, { month: 'long' })
}

export const toLocalizedDate = (date: Date, locale: string): string => {
  if (locale === 'ky-KG') {
    // ky-KG has no support in chrome since has to opt for ru-RU lang as options as it's 99% readable in KG region
    return date.toLocaleString('ru-RU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }
  return date.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const toLocalizedDateString = (date: Date, locale: string): string => {
  if (locale === 'ky-KG') {
    // ky-KG has no support in chrome since has to opt for ru-RU lang as options as it's 99% readable in KG region
    return date.toLocaleString('ru-RU', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })
  }
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
    if (locale === 'ky-KG') {
      // ky-KG has no support in chrome since has to opt for ru-RU lang as options as it's 99% readable in KG region
      return date.toLocaleString('ru-RU', { weekday: 'short' }).charAt(0)
    }
    return date.toLocaleString(locale, { weekday: 'short' }).charAt(0)
  })
}

export const getDayNameShort = (date: Date, locale: string) => {
  if (locale === 'ky-KG') {
    // ky-KG has no support in chrome since has to opt for ru-RU lang as options as it's 99% readable in KG region
    return date.toLocaleString('ru-RU', { weekday: 'short' })
  }
  return date.toLocaleString(locale, { weekday: 'short' })
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
