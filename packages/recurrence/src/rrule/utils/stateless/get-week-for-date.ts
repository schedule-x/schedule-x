function getFirstDateOfWeek(
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
): Temporal.ZonedDateTime | Temporal.PlainDate {
  const dateIsNthDayOfWeek = (date.dayOfWeek % 7) - firstDayOfWeek

  if (dateIsNthDayOfWeek === 0) {
    return date
  } else if (dateIsNthDayOfWeek > 0) {
    return date.subtract({ days: dateIsNthDayOfWeek })
  } else {
    return date.subtract({ days: 7 + dateIsNthDayOfWeek })
  }
}

export const getWeekForDate = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
): (Temporal.ZonedDateTime | Temporal.PlainDate)[] => {
  const startOfWeek = getFirstDateOfWeek(date, firstDayOfWeek)

  return Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.add({ days: index })
  )
}
