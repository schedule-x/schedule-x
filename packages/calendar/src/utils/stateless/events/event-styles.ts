import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { timePointToPercentage } from '../time/time-point-to-grid-percentage/time-point-to-grid-percentage'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { DayBoundariesInternal } from '@schedule-x/shared/src/types/calendar/day-boundaries'

export const getEventHeight = (
  start: string,
  end: string,
  dayBoundaries: DayBoundariesInternal,
  pointsPerDay: number
) => {
  return (
    timePointToPercentage(
      pointsPerDay,
      dayBoundaries,
      timePointsFromString(timeFromDateTime(end))
    ) -
    timePointToPercentage(
      pointsPerDay,
      dayBoundaries,
      timePointsFromString(timeFromDateTime(start))
    )
  )
}

export const getEventTop = (
  start: string,
  dayBoundaries: DayBoundariesInternal,
  pointsPerDay: number
) => {
  return timePointToPercentage(
    pointsPerDay,
    dayBoundaries,
    timePointsFromString(timeFromDateTime(start))
  )
}

export const getLeftRule = (calendarEvent: CalendarEventInternal) => {
  if (
    !calendarEvent._totalConcurrentEvents ||
    !calendarEvent._previousConcurrentEvents
  )
    return 0

  return (
    ((calendarEvent._previousConcurrentEvents || 0) /
      (calendarEvent._totalConcurrentEvents || 0)) *
    100
  )
}

export const getWidthRule = (leftRule: number) => {
  return 100 - leftRule
}

export const getBorderRule = (calendarEvent: CalendarEventInternal) => {
  if (!calendarEvent._previousConcurrentEvents) return 0
  return '1px solid #fff'
}
