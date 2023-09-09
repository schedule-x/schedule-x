import { DayBoundariesInternal } from '../../../../types/config/day-boundaries'

export const getTimeAxisHours = (
  { start, end }: DayBoundariesInternal,
  isHybridDay: boolean
) => {
  const hours: number[] = []
  let hour = Math.floor(start / 100)

  if (isHybridDay) {
    while (hour < 24) {
      hours.push(hour)
      hour += 1
    }

    hour = 0
  }

  const lastHour = end === 0 ? 24 : Math.ceil(end / 100)
  while (hour < lastHour) {
    hours.push(hour)
    hour += 1
  }

  return hours
}
