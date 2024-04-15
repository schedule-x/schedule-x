import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

const getLocaleStringMonthArgs = ($app: CalendarAppSingleton) => {
  if ($app.config.locale === 'ky-KG') {
    // ky-KG has no support in chrome since has to opt for ru-RU lang as options as it's 99% readable in KG region
    return ['ru-RU', { month: 'long' }] as const
  }
  return [$app.config.locale, { month: 'long' }] as const
}

const getLocaleStringYearArgs = ($app: CalendarAppSingleton) => {
  if ($app.config.locale === 'ky-KG') {
    // ky-KG has no support in chrome since has to opt for ru-RU lang as options as it's 99% readable in KG region
    return ['ru-RU', { year: 'numeric' }] as const
  }
  return [$app.config.locale, { year: 'numeric' }] as const
}

// convertTo_RuRU_If_KyKG_or_RuRU needed since the browsers treat ru locale with lowerCase

const convertToUpperCase_If_KyKG_or_RuRU_Locale = (
  $app: CalendarAppSingleton,
  rangeStart: string,
  rangeEnd: string
): string => {
  let startDateMonth = toJSDate(rangeStart).toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )

  const startDateYear = toJSDate(rangeStart).toLocaleString(
    ...getLocaleStringYearArgs($app)
  )
  let endDateMonth = toJSDate(rangeEnd).toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )

  const endDateYear = toJSDate(rangeEnd).toLocaleString(
    ...getLocaleStringYearArgs($app)
  )
  startDateMonth = startDateMonth[0].toUpperCase() + startDateMonth.slice(1)
  endDateMonth = endDateMonth[0].toUpperCase() + endDateMonth.slice(1)
  if (startDateMonth === endDateMonth && startDateYear === endDateYear) {
    return `${startDateMonth} ${startDateYear}`
  } else if (startDateMonth !== endDateMonth && startDateYear === endDateYear) {
    return `${startDateMonth} – ${endDateMonth} ${startDateYear}`
  }

  return `${startDateMonth} ${startDateYear} – ${endDateMonth} ${endDateYear}`
}

export const getMonthAndYearForDateRange = (
  $app: CalendarAppSingleton,
  rangeStart: string,
  rangeEnd: string
): string => {
  if ($app.config.locale === 'ru-RU' || $app.config.locale === 'ky-KG') {
    // convertTo_RuRU_If_KyKG_or_RuRU needed since the browsers treat ru locale with lowerCase
    return convertToUpperCase_If_KyKG_or_RuRU_Locale($app, rangeStart, rangeEnd)
  }
  const startDateMonth = toJSDate(rangeStart).toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )

  const startDateYear = toJSDate(rangeStart).toLocaleString(
    ...getLocaleStringYearArgs($app)
  )

  const endDateMonth = toJSDate(rangeEnd).toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )

  const endDateYear = toJSDate(rangeEnd).toLocaleString(
    ...getLocaleStringYearArgs($app)
  )

  if (startDateMonth === endDateMonth && startDateYear === endDateYear) {
    return `${startDateMonth} ${startDateYear}`
  } else if (startDateMonth !== endDateMonth && startDateYear === endDateYear) {
    return `${startDateMonth} – ${endDateMonth} ${startDateYear}`
  }

  return `${startDateMonth} ${startDateYear} – ${endDateMonth} ${endDateYear}`
}

export const getMonthAndYearForSelectedDate = ($app: CalendarAppSingleton) => {
  const dateMonth = toJSDate(
    $app.datePickerState.selectedDate.value
  ).toLocaleString(...getLocaleStringMonthArgs($app))
  const dateYear = toJSDate(
    $app.datePickerState.selectedDate.value
  ).toLocaleString(...getLocaleStringYearArgs($app))

  return `${dateMonth} ${dateYear}`
}
