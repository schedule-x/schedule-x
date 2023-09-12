import { toJSDate } from '../../../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '../../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { WeekDayContexts } from '../../../../types/week-day-context'
import CalendarAppSingleton from '../../../stateful/app-singleton/calendar-app-singleton'
import { DateRange } from '../../../../types/date-range'

export const getWeekDayContexts = ($app: CalendarAppSingleton) => {
  const weekDaysMap: WeekDayContexts = {}
  $app.timeUnitsImpl
    .getWeekFor(toJSDate(($app.calendarState.range.value as DateRange).start))
    .forEach((day) => {
      const dateString = toDateString(day)
      weekDaysMap[dateString] = {
        date: dateString,
        calendarEvents: [],
      }
    })

  return weekDaysMap
}
