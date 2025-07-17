

export const calculateDaysDifference = (
  startDate: Temporal.ZonedDateTime | Temporal.PlainDate,
  endDate: Temporal.ZonedDateTime | Temporal.PlainDate
): number => {
  return Temporal.PlainDate.from(startDate).until(Temporal.PlainDate.from(endDate)).total('days')
}
