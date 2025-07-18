import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

const DATE_PADDING_LENGTH = 2
const TIME_PADDING_CHAR = '0'

export const formatDateTime = (
  year: number,
  month: number,
  day: number,
  hours?: number,
  minutes?: number
): string => {
  const monthStr = String(month + 1).padStart(
    DATE_PADDING_LENGTH,
    TIME_PADDING_CHAR
  )
  const dayStr = String(day).padStart(DATE_PADDING_LENGTH, TIME_PADDING_CHAR)

  if (hours !== undefined && minutes !== undefined) {
    const hoursStr = String(hours).padStart(
      DATE_PADDING_LENGTH,
      TIME_PADDING_CHAR
    )
    const minutesStr = String(minutes).padStart(
      DATE_PADDING_LENGTH,
      TIME_PADDING_CHAR
    )
    return `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}`
  }

  return `${year}-${monthStr}-${dayStr}`
}

export const formatDateTimeFromString = (
  dateTime: string,
  year: number,
  month: number,
  day: number
): string => {
  const { hours, minutes } = toIntegers(dateTime)
  return formatDateTime(year, month, day, hours, minutes)
}
