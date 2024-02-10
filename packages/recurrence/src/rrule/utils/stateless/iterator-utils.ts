export const isDatePastUntil = (date: string, until: string | undefined) => {
  /* RFC5545: #2 */
  return until && date > until
}

export const isCountReached = (count: number, maxCount: number | undefined) => {
  return maxCount && count >= maxCount
}
