import { InvalidTimeStringError } from '../../../../../../../shared/utils/stateless/errors/invalid-time-string.error'
import { timeStringRegex } from '../../../../../../../shared/utils/stateless/time/validation/regex'

const minuteTimePointMultiplier = 1.6666666666666667 // 100 / 60

export const timePointsFromString = (timeString: string): number => {
  if (!timeStringRegex.test(timeString))
    throw new InvalidTimeStringError(timeString)
  const [hoursInt, minutesInt] = timeString
    .split(':')
    .map((time) => parseInt(time, 10))
  const minutePoints = (minutesInt * minuteTimePointMultiplier)
    .toString()
    .padStart(2, '0')

  return Number(hoursInt + minutePoints)
}
