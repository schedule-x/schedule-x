import { WeekDayContexts } from '../../../types/week-day-context'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import {
  dateFromDateTime,
  timeFromDateTime,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const resetEventConcurrencyProperties = (event: CalendarEventInternal) => {
  event._previousConcurrentEvents = undefined
  event._totalConcurrentEvents = undefined
}

export const positionInTimeGrid = (
  timeGridEvents: CalendarEventInternal[],
  weekDayContexts: WeekDayContexts,
  $app: CalendarAppSingleton
) => {
  for (const event of timeGridEvents) {
    resetEventConcurrencyProperties(event)

    if (
      event.time.start >= $app.calendarState.range.value!.start &&
      event.time.end < $app.calendarState.range.value!.end
    ) {
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
