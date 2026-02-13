export const compareTemporalDates = (
  a: Temporal.ZonedDateTime | Temporal.PlainDate,
  b: Temporal.ZonedDateTime | Temporal.PlainDate
): number => {
  if (
    a instanceof Temporal.ZonedDateTime &&
    b instanceof Temporal.ZonedDateTime
  ) {
    return Temporal.ZonedDateTime.compare(a, b)
  }
  if (a instanceof Temporal.PlainDate && b instanceof Temporal.PlainDate) {
    return Temporal.PlainDate.compare(a, b)
  }
  // If types don't match, this indicates a programming error
  throw new Error(
    `Cannot compare mismatched Temporal types: ${a.constructor.name} vs ${b.constructor.name}. ` +
      `All dates in a recurrence rule should be of the same type.`
  )
}

export const isDatePastUntil = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  until: Temporal.ZonedDateTime | Temporal.PlainDate | undefined
) => {
  /* RFC5545: #2 */
  return until && compareTemporalDates(date, until) > 0
}

export const isCountReached = (count: number, maxCount: number | undefined) => {
  return maxCount && count >= maxCount
}
