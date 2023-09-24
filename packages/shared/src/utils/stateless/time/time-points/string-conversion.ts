import { InvalidTimeStringError } from '../../errors/invalid-time-string.error'
import { timeStringRegex } from '../validation/regex'
import { doubleDigit } from '../date-time-mutation/date-time-mutation'
import { toJSDate } from '../format-conversion/format-conversion'
import { toDateTimeString } from '../format-conversion/date-to-strings'

const minuteTimePointMultiplier = 1.6666666666666667 // 100 / 60

export const timePointsFromString = (timeString: string): number => {
  if (!timeStringRegex.test(timeString))
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
  dateTimeString: string,
  pointsToAdd: number
): string => {
  const minutesToAdd = pointsToAdd / minuteTimePointMultiplier
  const jsDate = toJSDate(dateTimeString)
  jsDate.setMinutes(jsDate.getMinutes() + minutesToAdd)
  return toDateTimeString(jsDate)
}
