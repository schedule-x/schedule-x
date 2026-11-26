export const addMonths = (
  to: Temporal.ZonedDateTime | Temporal.PlainDate,
  nMonths: number
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  if (nMonths < 0) {
    return to.subtract({ months: -nMonths })
  }

  return to.add({ months: nMonths })
}

export const addDays = (
  to: Temporal.ZonedDateTime | Temporal.PlainDate,
  nDays: number
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  if (nDays < 0) {
    return to.subtract({ days: -nDays })
  }

  return to.add({ days: nDays })
}

export const addMinutesToTemporal = (
  to: Temporal.ZonedDateTime | Temporal.PlainDate,
  nMinutes: number
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  if (nMinutes < 0) {
    return to.subtract({ minutes: -nMinutes })
  }

  return to.add({ minutes: nMinutes })
}
