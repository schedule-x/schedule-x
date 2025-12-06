import { DateRange } from '@schedule-x/shared/src/types/date-range'

export const rangeToString = (range: DateRange | null): string | null => {
  if (!range) {
    return null
  }

  return `${range.start.toString()}-${range.end.toString()}`
}
