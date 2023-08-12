import { dateFormatLocalizedRules } from './date-format-localized-rules'
import {
  DateFormatDelimiter as Delimiter,
  DateFormatOrder as Order,
} from '../../../../../enums/time/date-format'
import { doubleDigit } from '../../date-time-mutation/date-time-mutation'
import { LocaleNotSupportedError } from '../../../errors/locale-not-supported.error'
import { InvalidDateFormatError } from '../../../errors/invalid-date-format.error'

const _getMatchesOrThrow = (
  format: string,
  matcher: RegExp,
  locale: string
) => {
  const matches = format.match(matcher)
  if (!matches) throw new InvalidDateFormatError(format, locale)
  return matches
}

export const toDateString = (format: string, locale: string) => {
  const internationalFormat = /^\d{4}-\d{2}-\d{2}$/
  if (internationalFormat.test(format)) return format // allow international format regardless of locale

  const localeDateFormatRule = dateFormatLocalizedRules.get(locale)
  if (!localeDateFormatRule) throw new LocaleNotSupportedError(locale)

  const { order, delimiter } = localeDateFormatRule
  const pattern224Slashed = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  const pattern224Dotted = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/

  if (order === Order.DMY && delimiter === Delimiter.SLASH) {
    const matches = _getMatchesOrThrow(format, pattern224Slashed, locale)
    const [, day, month, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  if (order === Order.MDY && delimiter === Delimiter.SLASH) {
    const matches = _getMatchesOrThrow(format, pattern224Slashed, locale)
    const [, month, day, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  if (order === Order.DMY && delimiter === Delimiter.PERIOD) {
    const matches = _getMatchesOrThrow(format, pattern224Dotted, locale)
    const [, day, month, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  throw new InvalidDateFormatError(format, locale)
}
