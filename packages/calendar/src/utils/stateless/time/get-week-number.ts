export const getWeekNumber = (
  d: Temporal.ZonedDateTime | Temporal.PlainDate,
  firstDayOfWeek: number
) => {
  // Convert to ZonedDateTime if it's a PlainDate
  const zonedDate =
    d instanceof Temporal.PlainDate
      ? d.toZonedDateTime('UTC')
      : d.toInstant().toZonedDateTimeISO('UTC')

  // Adjust the date to the nearest desired first day of the week
  const dayOffset = (zonedDate.dayOfWeek - firstDayOfWeek + 7) % 7
  const adjustedDate = zonedDate.subtract({ days: dayOffset - 3 })

  // Get first day of year adjusted for firstDayOfWeek
  const yearStart = Temporal.ZonedDateTime.from({
    year: adjustedDate.year,
    month: 1,
    day: 1,
    timeZone: 'UTC',
  })
  const yearStartOffset = (yearStart.dayOfWeek - firstDayOfWeek + 7) % 7
  const adjustedYearStart = yearStart.subtract({ days: yearStartOffset })

  // Calculate full weeks from adjusted start of the year
  const daysDiff = adjustedDate.until(adjustedYearStart, {
    largestUnit: 'days',
  }).days
  const weekNo = Math.ceil((Math.abs(daysDiff) + 1) / 7)

  // Handle edge case for the last days of the year falling into week 53
  const nextYearStart = Temporal.ZonedDateTime.from({
    year: adjustedDate.year + 1,
    month: 1,
    day: 1,
    timeZone: 'UTC',
  })
  const nextYearStartOffset = (nextYearStart.dayOfWeek - firstDayOfWeek + 7) % 7
  const adjustedNextYearStart = nextYearStart.subtract({
    days: nextYearStartOffset,
  })

  if (
    Temporal.ZonedDateTime.compare(adjustedDate, adjustedNextYearStart) >= 0
  ) {
    return 1
  }

  return weekNo
}
