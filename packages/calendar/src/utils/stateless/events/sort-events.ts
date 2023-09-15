import {
  dateFromDateTime,
  timeFromDateTime,
} from '../../../../../../shared/utils/stateless/time/format-conversion/string-to-string'
import { timePointsFromString } from '../time/time-points/string-conversion'
import { addDays } from '../../../../../../shared/utils/stateless/time/date-time-mutation/adding'
import { CalendarEventInternal } from '../../stateful/calendar-event/calendar-event.interface'
import CalendarAppSingleton from '../../stateful/app-singleton/calendar-app-singleton'
import { WeekDayContexts } from '../../../types/week-day-context'

export const sortEventsForWeekView = (
  $app: CalendarAppSingleton,
  updatedWeekDayContexts: WeekDayContexts
) => {
  const headerEvents: CalendarEventInternal[] = []

  $app.calendarEvents.list.value.forEach((event) => {
    const isWeekGridEvent =
      event._isSingleDayTimed || event._isSingleHybridDayTimed
    const isInRange =
      event.time.start >= $app.calendarState.range.value!.start &&
      event.time.end < $app.calendarState.range.value!.end

    if (isWeekGridEvent && isInRange) {
      let date = dateFromDateTime(event.time.start)
      const timeFromStart = timeFromDateTime(event.time.start)
      if (
        timePointsFromString(timeFromStart) < $app.config.dayBoundaries.start
      ) {
        date = addDays(date, -1)
      }
      updatedWeekDayContexts[date].calendarEvents.push(event)
    } else if (isInRange) {
      headerEvents.push(event)
    }
  })

  return { updatedWeekDayContexts, headerEvents }
}

export const sortEventsByStart = (
  a: CalendarEventInternal,
  b: CalendarEventInternal
) => {
  if (a.time.start < b.time.start) return -1
  if (a.time.start > b.time.start) return 1
  return 0
}
