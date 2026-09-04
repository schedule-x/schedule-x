export const getTemporalDuration = (
  dtstart: Temporal.ZonedDateTime,
  dtend: Temporal.ZonedDateTime
): Temporal.Duration => {
  return dtstart.until(dtend, { smallestUnit: 'nanoseconds' })
}
