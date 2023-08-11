import { dateFormatLocalizedRules } from './date-format-localized-rules.ts'
import {
  DateFormatDelimiter,
  DateFormatOrder,
} from '../../../../../enums/time/date-format.ts'
import { doubleDigit } from '../../date-time-mutation/date-time-mutation.ts'
import { LocaleNotSupportedError } from "../../../errors/locale-not-supported.error.ts";
import { InvalidDateFormatError } from "../../../errors/invalid-date-format.error.ts";

export const toDateString = (format: string, locale: string) => {
  const pattern224Slashed = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  const pattern224Dotted = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/
  const localeDateFormatRule = dateFormatLocalizedRules.get(locale)

  if (!localeDateFormatRule) throw new LocaleNotSupportedError(locale)

  if (
    localeDateFormatRule.order === DateFormatOrder.DMY &&
    localeDateFormatRule.delimiter === DateFormatDelimiter.SLASH
  ) {
    const matches = format.match(pattern224Slashed)
    if (!matches) throw new InvalidDateFormatError(format, locale)

    const [, day, month, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  if (
    localeDateFormatRule.order === DateFormatOrder.MDY &&
    localeDateFormatRule.delimiter === DateFormatDelimiter.SLASH
  ) {
    const matches = format.match(pattern224Slashed)
    if (!matches) throw new InvalidDateFormatError(format, locale)

    const [, month, day, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  if (
    localeDateFormatRule.order === DateFormatOrder.DMY &&
    localeDateFormatRule.delimiter === DateFormatDelimiter.PERIOD
  ) {
    const matches = format.match(pattern224Dotted)
    if (!matches) throw new InvalidDateFormatError(format, locale)

    const [, day, month, year] = matches
    return `${year}-${doubleDigit(+month)}-${doubleDigit(+day)}`
  }

  if (
    localeDateFormatRule.order === DateFormatOrder.YMD &&
    localeDateFormatRule.delimiter === DateFormatDelimiter.DASH
  ) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(format)) throw new InvalidDateFormatError(format, locale)

    return format
  }
}
