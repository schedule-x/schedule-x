import { InvalidTimeStringError } from '../../../../../../../shared/utils/stateless/errors/invalid-time-string.error'
import { timeStringRegex } from '../../../../../../../shared/utils/stateless/time/validation/regex'

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
