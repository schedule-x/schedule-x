export const getWeekNumber = (d: Date, firstDayOfWeek: number) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))

  // Adjust the date to the nearest desired first day of the week
  const dayOffset = (d.getUTCDay() - firstDayOfWeek + 7) % 7
  d.setUTCDate(d.getUTCDate() - dayOffset + 3)

  // Get first day of year adjusted for firstDayOfWeek
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const yearStartOffset = (yearStart.getUTCDay() - firstDayOfWeek + 7) % 7
  yearStart.setUTCDate(yearStart.getUTCDate() - yearStartOffset)

  // Calculate full weeks from adjusted start of the year
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  )

  // Handle edge case for the last days of the year falling into week 53
  const nextYearStart = new Date(Date.UTC(d.getUTCFullYear() + 1, 0, 1))
  const nextYearStartOffset =
    (nextYearStart.getUTCDay() - firstDayOfWeek + 7) % 7
  nextYearStart.setUTCDate(nextYearStart.getUTCDate() - nextYearStartOffset)
  if (d >= nextYearStart) {
    return 1
  }

  return weekNo
}
