import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { Week } from '../../../../types/week'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

const createOneDay = (week: Week, date: Date) => {
  const dateString = toDateString(date)
  week[dateString] = {
    date: dateString,
    timeGridEvents: [],
    dateGridEvents: {},
  }

  return week
}

export const createWeek = ($app: CalendarAppSingleton) => {
  if ($app.calendarState.view.value === InternalViewName.Day)
    return createOneDay(
      {},
      toJSDate(($app.calendarState.range.value as DateRange).start)
    )

  const nDays =
    typeof $app.config.weekOptions.nDays === 'number'
      ? $app.config.weekOptions.nDays
      : 7

  // Week mode
  return $app.timeUnitsImpl
    .getWeekFor(toJSDate(($app.calendarState.range.value as DateRange).start))
    .slice(0, nDays)
    .reduce(createOneDay, {} as Week)
}
