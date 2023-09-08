import { DayBoundariesInternal } from '../../../../types/config/day-boundaries'

// given start and end, numbers between 0 and 2399, return an array of hours.
// an hour is represented as a number divisible by 100, e.g. 100, 200, 300, etc. then divided by 100 before returned.
// start can be later than end, since the time axis can span midnight.
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

      if (hour === 24) {
        hour = 0
      }
    }
  }

  const lastHour = end === 0 ? 24 : Math.ceil(end / 100)
  while (hour < lastHour) {
    hours.push(hour)
    hour += 1
  }

  return hours
}
