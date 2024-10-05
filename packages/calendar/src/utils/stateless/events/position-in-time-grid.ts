import { Week } from '../../../types/week'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import {
  dateFromDateTime,
  timeFromDateTime,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'

export const positionInTimeGrid = (
  timeGridEvents: CalendarEventInternal[],
  week: Week,
  $app: CalendarAppSingleton
) => {
  for (const event of timeGridEvents) {
    const range = $app.calendarState.range.value as DateRange

    if (event.start >= range.start && event.end <= range.end) {
      let date = dateFromDateTime(event.start)
      const timeFromStart = timeFromDateTime(event.start)
      if (
        timePointsFromString(timeFromStart) <
        $app.config.dayBoundaries.value.start
      ) {
        date = addDays(date, -1)
      }
      week[date]?.timeGridEvents.push(event)
    }
  }

  return week
}
