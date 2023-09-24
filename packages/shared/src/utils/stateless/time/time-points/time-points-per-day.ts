export const timePointsPerDay = (
  dayStart: number,
  dayEnd: number,
  isHybridDay: boolean
) => {
  if (dayStart === dayEnd) return 2400
  if (isHybridDay) return 2400 - dayStart + dayEnd

  return dayEnd - dayStart
}
