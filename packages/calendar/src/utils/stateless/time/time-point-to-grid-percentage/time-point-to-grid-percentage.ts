import { DayBoundariesInternal } from '@schedule-x/shared/src/types/calendar/day-boundaries'

export const timePointToPercentage = (
  timePointsInDay: number,
  dayBoundaries: DayBoundariesInternal,
  timePoint: number
) => {
  if (timePoint < dayBoundaries.start) {
    const firstDayTimePoints = 2400 - dayBoundaries.start
    return ((timePoint + firstDayTimePoints) / timePointsInDay) * 100
  }

  return ((timePoint - dayBoundaries.start) / timePointsInDay) * 100
}
