import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { WeekDayContexts } from '../../../../types/week-day-context'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { DateRange } from '../../../../types/date-range'
import { InternalViewName } from '../../../../enums/internal-view.enum'

const createContextForOneDate = (acc: WeekDayContexts, date: Date) => {
  const dateString = toDateString(date)
  acc[dateString] = {
    date: dateString,
    timeGridEvents: [],
    dateGridEvents: {},
  }

  return acc
}

export const createWeekDayContexts = ($app: CalendarAppSingleton) => {
  if ($app.calendarState.view.value === InternalViewName.Day)
    return createContextForOneDate(
      {},
      toJSDate($app.calendarState.range.value!.start)
    )

  // Week mode
  return $app.timeUnitsImpl
    .getWeekFor(toJSDate(($app.calendarState.range.value as DateRange).start))
    .reduce(createContextForOneDate, {} as WeekDayContexts)
}
