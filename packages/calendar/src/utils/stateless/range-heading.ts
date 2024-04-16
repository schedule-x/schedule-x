import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { translate, translations } from '@schedule-x/translations/src'

const getLocaleStringMonthArgs = (date: Date, $app: CalendarAppSingleton) => {
  const language = translate($app.config.locale, translations)

  if (language('monthsName') === 'monthsName') {
    return date.toLocaleString($app.config.locale, { month: 'long' })
  }
  return language('monthsName')[date.getMonth()]
}

const getLocaleStringYearArgs = (date: Date, $app: CalendarAppSingleton) => {
  return date.toLocaleString($app.config.locale, { year: 'numeric' })
}

export const getMonthAndYearForDateRange = (
  $app: CalendarAppSingleton,
  rangeStart: string,
  rangeEnd: string
): string => {
  const startDateMonth = getLocaleStringMonthArgs(toJSDate(rangeStart), $app)
  const endDateMonth = getLocaleStringMonthArgs(toJSDate(rangeEnd), $app)
  const startDateYear = getLocaleStringYearArgs(toJSDate(rangeStart), $app)
  const endDateYear = getLocaleStringYearArgs(toJSDate(rangeEnd), $app)

  if (startDateMonth === endDateMonth && startDateYear === endDateYear) {
    return `${startDateMonth} ${startDateYear}`
  } else if (startDateMonth !== endDateMonth && startDateYear === endDateYear) {
    return `${startDateMonth} – ${endDateMonth} ${startDateYear}`
  }

  return `${startDateMonth} ${startDateYear} – ${endDateMonth} ${endDateYear}`
}

export const getMonthAndYearForSelectedDate = ($app: CalendarAppSingleton) => {
  const dateMonth = getLocaleStringMonthArgs(
    toJSDate($app.datePickerState.selectedDate.value),
    $app
  )
  const dateYear = getLocaleStringYearArgs(
    toJSDate($app.datePickerState.selectedDate.value),
    $app
  )

  return `${dateMonth} ${dateYear}`
}
