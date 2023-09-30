import { NumberRangeError } from '../../errors/number-range.error'

export const doubleDigit = (number: number): string => {
  if (number < 0 || number > 99) throw new NumberRangeError(0, 99)

  return String(number).padStart(2, '0')
}
