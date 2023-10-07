import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { WeekDayContexts } from '../../../../types/week-day-context'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { DateRange } from '../../../../types/date-range'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'

export const createWeekDayContexts = ($app: CalendarAppSingleton) => {
  return $app.timeUnitsImpl
    .getWeekFor(toJSDate(($app.calendarState.range.value as DateRange).start))
    .filter((date) => {
      const dateString = toDateString(date)
      return (
        dateString >= dateFromDateTime($app.calendarState.range.value!.start) &&
        dateString <= dateFromDateTime($app.calendarState.range.value!.end)
      )
    })
    .reduce((acc, date) => {
      const dateString = toDateString(date)
      acc[dateString] = {
        date: dateString,
        timeGridEvents: [],
        dateGridEvents: {},
      }

      return acc
    }, {} as WeekDayContexts)
}
