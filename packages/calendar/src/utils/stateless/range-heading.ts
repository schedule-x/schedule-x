import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'


const getLocaleStringMonthArgs = ($app: CalendarAppSingleton) => {
  return [$app.config.locale.value, { month: 'long' }] as const
}

const getLocaleStringYearArgs = ($app: CalendarAppSingleton) => {
  return [$app.config.locale.value, { year: 'numeric' }] as const
}

export const getMonthAndYearForDateRange = (
  $app: CalendarAppSingleton,
  rangeStart: Temporal.ZonedDateTime,
  rangeEnd: Temporal.ZonedDateTime
): string => {
  const startDateMonth = rangeStart.toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )
  const startDateYear = rangeStart.toLocaleString(
    ...getLocaleStringYearArgs($app)
  )
  const endDateMonth = rangeEnd.toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )
  const endDateYear = rangeEnd.toLocaleString(
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
  const dateMonth = $app.datePickerState.selectedDate.value.toLocaleString(
    ...getLocaleStringMonthArgs($app)
  )
  const dateYear = $app.datePickerState.selectedDate.value.toLocaleString(
    ...getLocaleStringYearArgs($app)
  )

  return `${dateMonth} ${dateYear}`
}
