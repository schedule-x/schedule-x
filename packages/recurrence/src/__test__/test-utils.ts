import 'temporal-polyfill/global'

/**
 * Test utility to convert date strings to Temporal.PlainDate
 * @param dateStr - Date string in format 'YYYY-MM-DD'
 */
export const date = (dateStr: string): Temporal.PlainDate => {
  return Temporal.PlainDate.from(dateStr)
}

/**
 * Test utility to convert datetime strings to Temporal.ZonedDateTime
 * @param datetimeStr - DateTime string in format 'YYYY-MM-DD HH:MM' or ISO 8601
 * @param timezone - IANA timezone (default: 'UTC')
 */
export const datetime = (
  datetimeStr: string,
  timezone: string = 'UTC'
): Temporal.ZonedDateTime => {
  // Convert SX format "2024-12-31 23:30" to ISO 8601 "2024-12-31T23:30:00"
  const isoStr = datetimeStr.includes('T')
    ? datetimeStr
    : datetimeStr.replace(' ', 'T') + ':00'

  return Temporal.ZonedDateTime.from(`${isoStr}[${timezone}]`)
}

/**
 * Test utility to create recurrence result objects
 */
export const recurrence = (
  start: Temporal.ZonedDateTime | Temporal.PlainDate,
  end: Temporal.ZonedDateTime | Temporal.PlainDate
) => ({
  start,
  end,
})
