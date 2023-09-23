import { toJSDate } from '../../../../../../shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '../../../../../../shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { WeekDayContexts } from '../../../../types/week-day-context'
import CalendarAppSingleton from '../../../stateful/app-singleton/calendar-app-singleton'
import { DateRange } from '../../../../types/date-range'

export const createWeekDayContexts = ($app: CalendarAppSingleton) => {
  return $app.timeUnitsImpl
    .getWeekFor(toJSDate(($app.calendarState.range.value as DateRange).start))
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
