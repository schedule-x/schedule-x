import { DayBoundariesInternal } from '../../../../types/config/day-boundaries'

export const timePointToPercentage = (
  timePointsInDay: number,
  dayBoundaries: DayBoundariesInternal,
  timePoint: number
) => {
  const firstDayTimePoints = 2400 - dayBoundaries.start

  if (timePoint < dayBoundaries.start) {
    return ((timePoint + firstDayTimePoints) / timePointsInDay) * 100
  }

  return ((timePoint - dayBoundaries.start) / timePointsInDay) * 100
}
