export const isDatePastUntil = (date: string, until: string | undefined) => {
  return until && date > until
}

export const isCountReached = (count: number, maxCount: number | undefined) => {
  return maxCount && count >= maxCount
}
