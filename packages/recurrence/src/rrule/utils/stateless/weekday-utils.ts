import { getJSDayFromByday } from './byday-jsday-map'

export interface ParsedBydaySpec {
  position?: number
  weekday: number
  dayCode: string
}

export const parseBydaySpec = (daySpec: string): ParsedBydaySpec | null => {
  // Validate input format: optional position followed by two-letter day code
  const match = daySpec.match(/^([+-]?\d*)([A-Z]{2})$/)
  if (!match) return null

  const [, positionStr, dayCode] = match

  let position: number | undefined
  if (positionStr === '') {
    position = undefined
  } else {
    // Use Number for strict parsing so malformed specs (e.g. "1X") produce NaN
    const parsedPosition = Number(positionStr)
    if (Number.isNaN(parsedPosition)) {
      return null
    }
    // RFC 5545 allows positions from -366 to -1 and 1 to 366
    if (parsedPosition === 0 || parsedPosition > 366 || parsedPosition < -366) {
      return null
    }
    position = parsedPosition
  }

  const weekday = getJSDayFromByday(dayCode)
  if (weekday === undefined) return null

  return {
    position,
    weekday,
    dayCode,
  }
}

export const getWeekdayOccurrencesInMonth = (
  year: number,
  month: number,
  weekday: number
): number[] => {
  const occurrences: number[] = []
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const date = new Date(year, month, day)
    if (date.getDay() === weekday) {
      occurrences.push(day)
    }
  }

  return occurrences
}

export const getNthWeekdayOfMonth = (
  year: number,
  month: number,
  weekday: number,
  position: number
): number => {
  const occurrences = getWeekdayOccurrencesInMonth(year, month, weekday)

  if (position > 0) {
    return position <= occurrences.length ? occurrences[position - 1] : -1
  } else if (position < 0) {
    const index = occurrences.length + position
    return index >= 0 ? occurrences[index] : -1
  }

  return -1
}
