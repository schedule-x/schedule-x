import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import {
  addTimePointsToDateTime,
  timePointsFromString,
} from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { DayBoundariesInternal } from '@schedule-x/shared/src/types/calendar/day-boundaries'
import { timePointToPercentage } from '@schedule-x/shared/src/utils/stateless/time/interpolation/time-point-to-grid-percentage'

export const getEventHeight = (
  start: string,
  end: string,
  dayBoundaries: DayBoundariesInternal,
  pointsPerDay: number
) => {
  if (start === end) {
    return (
      timePointToPercentage(
        pointsPerDay,
        dayBoundaries,
        timePointsFromString(timeFromDateTime(addTimePointsToDateTime(end, 50)))
      ) -
      timePointToPercentage(
        pointsPerDay,
        dayBoundaries,
        timePointsFromString(timeFromDateTime(start))
      )
    )
  }

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

export const getInlineStartRule = (
  calendarEvent: CalendarEventInternal,
  eventWidth: number
) => {
  if (
    !calendarEvent._totalConcurrentEvents ||
    !calendarEvent._previousConcurrentEvents
  )
    return 0

  return (
    ((calendarEvent._previousConcurrentEvents || 0) /
      (calendarEvent._totalConcurrentEvents || 0)) *
    eventWidth
  )
}

export const getWidthRule = (
  leftRule: number,
  eventWidth: number,
  maxConcurrentEvents: number | undefined,
  eventOverlap: boolean
) => {
  if (eventOverlap || !maxConcurrentEvents) return eventWidth - leftRule
  return eventWidth / maxConcurrentEvents
}

export const getBorderRule = (calendarEvent: CalendarEventInternal) => {
  if (!calendarEvent._previousConcurrentEvents) return 0
  return '1px solid #fff'
}
