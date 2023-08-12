import { dateFormatLocalizedRules } from './date-format-localized-rules.ts'
import {
  DateFormatDelimiter as Delimiter,
  DateFormatOrder as Order,
} from '../../../../../enums/time/date-format.ts'
import { doubleDigit } from '../../date-time-mutation/date-time-mutation.ts'
import { LocaleNotSupportedError } from '../../../errors/locale-not-supported.error.ts'
import { InvalidDateFormatError } from '../../../errors/invalid-date-format.error.ts'

export const toDateString = (format: string, locale: string) => {
  const internationalFormat = /^\d{4}-\d{2}-\d{2}$/
  if (internationalFormat.test(format)) return format // allow international format regardless of locale

  const localeDateFormatRule = dateFormatLocalizedRules.get(locale)
  if (!localeDateFormatRule) throw new LocaleNotSupportedError(locale)

  const { order, delimiter } = localeDateFormatRule
  const pattern224Slashed = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  const pattern224Dotted = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/

  if (order === Order.DMY && delimiter === Delimiter.SLASH) {
    const matches = format.match(pattern224Slashed)
    if (!matches) throw new InvalidDateFormatError(format, locale)

    const [, day, month, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  if (order === Order.MDY && delimiter === Delimiter.SLASH) {
    const matches = format.match(pattern224Slashed)
    if (!matches) throw new InvalidDateFormatError(format, locale)

    const [, month, day, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  if (order === Order.DMY && delimiter === Delimiter.PERIOD) {
    const matches = format.match(pattern224Dotted)
    if (!matches) throw new InvalidDateFormatError(format, locale)

    const [, day, month, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  throw new InvalidDateFormatError(format, locale)
}
