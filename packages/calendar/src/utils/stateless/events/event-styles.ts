import {
  CalendarEventInternal,
  CalendarEventTime,
} from '../../stateful/calendar-event/calendar-event.interface'
import { timeFromDateTime } from '../../../../../../shared/utils/stateless/time/format-conversion/string-to-string'
import { timePointToPercentage } from '../time/time-point-to-grid-percentage/time-point-to-grid-percentage'
import { timePointsFromString } from '../time/time-points/string-conversion'
import { DayBoundariesInternal } from '../../../types/config/day-boundaries'

export const getEventHeight = (
  eventTime: CalendarEventTime,
  dayBoundaries: DayBoundariesInternal,
  pointsPerDay: number
) => {
  return (
    timePointToPercentage(
      pointsPerDay,
      dayBoundaries,
      timePointsFromString(timeFromDateTime(eventTime.end))
    ) -
    timePointToPercentage(
      pointsPerDay,
      dayBoundaries,
      timePointsFromString(timeFromDateTime(eventTime.start))
    )
  )
}

export const getEventTop = (
  eventTime: CalendarEventTime,
  dayBoundaries: DayBoundariesInternal,
  pointsPerDay: number
) => {
  return timePointToPercentage(
    pointsPerDay,
    dayBoundaries,
    timePointsFromString(timeFromDateTime(eventTime.start))
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

export const getBorderTopRule = (calendarEvent: CalendarEventInternal) => {
  if (!calendarEvent._previousConcurrentEvents) return 0
  return '1px solid #fff'
}
