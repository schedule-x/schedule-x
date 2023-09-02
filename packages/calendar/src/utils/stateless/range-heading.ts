import CalendarAppSingleton from '../stateful/app-singleton/calendar-app-singleton'
import { toJSDate } from '../../../../../shared/utils/stateless/time/format-conversion/format-conversion'

const getLocaleStringMonthArgs = ($app: CalendarAppSingleton) => {
  return [$app.config.locale, { month: 'long' }] as const
}

const getLocaleStringYearArgs = ($app: CalendarAppSingleton) => {
  return [$app.config.locale, { year: 'numeric' }] as const
}

export const getRangeHeadingForWeekView = (
  $app: CalendarAppSingleton,
  startDate: string,
  endDate: string
): string => {
  const startDateMonth = toJSDate(startDate).toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )
  const startDateYear = toJSDate(startDate).toLocaleString(
    ...getLocaleStringYearArgs($app)
  )
  const endDateMonth = toJSDate(endDate).toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )
  const endDateYear = toJSDate(endDate).toLocaleString(
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
