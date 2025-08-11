import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { jsDateToDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

function getFirstDateOfWeek(
  date: Date,
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
) {
  const dateIsNthDayOfWeek = date.getDay() - firstDayOfWeek

  const firstDateOfWeek = date
  if (dateIsNthDayOfWeek === 0) {
    return firstDateOfWeek
  } else if (dateIsNthDayOfWeek > 0) {
    firstDateOfWeek.setDate(date.getDate() - dateIsNthDayOfWeek)
  } else {
    firstDateOfWeek.setDate(date.getDate() - (7 + dateIsNthDayOfWeek))
  }

  return firstDateOfWeek
}

export const getWeekForDate = (
  date: string,
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
) => {
  const dateJS = toJSDate(date)
  const startOfWeek = getFirstDateOfWeek(dateJS, firstDayOfWeek)
  startOfWeek.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + index)
    return jsDateToDateString(day)
  })
}
