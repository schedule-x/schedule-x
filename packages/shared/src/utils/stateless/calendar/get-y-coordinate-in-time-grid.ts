import { DayBoundariesInternal } from '../../../types/calendar/day-boundaries'
import { timePointToPercentage } from '../time/interpolation/time-point-to-grid-percentage'
import { timePointsFromString } from '../time/time-points/string-conversion'
import { timeFromDateTime } from '../time/format-conversion/string-to-string'

export const getYCoordinateInTimeGrid = (
  dateTimeString: string,
  dayBoundaries: DayBoundariesInternal,
  pointsPerDay: number
) => {
  return timePointToPercentage(
    pointsPerDay,
    dayBoundaries,
    timePointsFromString(timeFromDateTime(dateTimeString))
  )
}
