import { InvalidTimeStringError } from '../../../../../../../shared/utils/stateless/errors/invalid-time-string.error'
import { timeStringRegex } from '../../../../../../../shared/utils/stateless/time/validation/regex'
import { doubleDigit } from '../../../../../../../shared/utils/stateless/time/date-time-mutation/date-time-mutation'

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
