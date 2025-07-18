import { InvalidTimeStringError } from '../../errors/invalid-time-string.error'
import { timeStringRegex } from '../validation/regex'
import { toJSDate } from '../format-conversion/format-conversion'
import { toDateTimeString } from '../format-conversion/date-to-strings'
import { doubleDigit } from '../date-time-mutation/double-digit'


const minuteTimePointMultiplier = 1.6666666666666667 // 100 / 60

export const timePointsFromString = (timeString: string): number => {
  if (!timeStringRegex.test(timeString) && timeString !== '24:00')
    throw new InvalidTimeStringError(timeString)
  const [hoursInt, minutesInt] = timeString
    .split(':')
    .map((time) => parseInt(time, 10))
  let minutePoints = (minutesInt * minuteTimePointMultiplier).toString()
  if (minutePoints.split('.')[0].length < 2) minutePoints = `0${minutePoints}`

  return Number(hoursInt + minutePoints)
}

export const timeStringFromTimePoints = (timePoints: number): string => {
  const hours = Math.floor(timePoints / 100)
  const minutes = Math.round((timePoints % 100) / minuteTimePointMultiplier)
  return `${doubleDigit(hours)}:${doubleDigit(minutes)}`
}

export const addTimePointsToDateTime = (
  dateTime: Temporal.ZonedDateTime,
  pointsToAdd: number
): Temporal.ZonedDateTime => {
  const minutesToAdd = Math.round(pointsToAdd / minuteTimePointMultiplier)
  const newDateTime = dateTime.add({ minutes: minutesToAdd })

  return newDateTime
}
