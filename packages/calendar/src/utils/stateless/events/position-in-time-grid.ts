import { WeekDayContexts } from '../../../types/week-day-context'
import { CalendarEventInternal } from '../../stateful/calendar-event/calendar-event.interface'
import CalendarAppSingleton from '../../stateful/app-singleton/calendar-app-singleton'
import {
  dateFromDateTime,
  timeFromDateTime,
} from '../../../../../../shared/utils/stateless/time/format-conversion/string-to-string'
import { timePointsFromString } from '../time/time-points/string-conversion'
import { addDays } from '../../../../../../shared/utils/stateless/time/date-time-mutation/adding'

export const positionInTimeGrid = (
  timeGridEvents: CalendarEventInternal[],
  weekDayContexts: WeekDayContexts,
  $app: CalendarAppSingleton
) => {
  for (const event of timeGridEvents) {
    const isSingleDayTimedInRange =
      event.time.start >= $app.calendarState.range.value!.start &&
      event.time.end < $app.calendarState.range.value!.end

    if (isSingleDayTimedInRange) {
      let date = dateFromDateTime(event.time.start)
      const timeFromStart = timeFromDateTime(event.time.start)
      if (
        timePointsFromString(timeFromStart) < $app.config.dayBoundaries.start
      ) {
        date = addDays(date, -1)
      }
      weekDayContexts[date].timeGridEvents.push(event)
    }
  }

  return weekDayContexts
}
