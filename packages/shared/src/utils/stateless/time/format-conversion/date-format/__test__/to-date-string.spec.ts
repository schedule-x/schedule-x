import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '../../../../testing/unit/unit-testing-library.impl'
import { toDateString } from '../to-date-string'
import { LocaleNotSupportedError } from '../../../../errors/locale-not-supported.error'
import { InvalidDateFormatError } from '../../../../errors/invalid-date-format.error'

describe('date format conversion', () => {
  it.each([
    ['en-GB', '31/02/2020', '2020-02-31'],
    ['en-GB', '1/2/2023', '2023-02-01'],
    ['en-US', '02/31/2020', '2020-02-31'],
    ['en-US', '2/1/2023', '2023-02-01'],
    ['de-DE', '31.02.2020', '2020-02-31'],
    ['de-DE', '1.2.2023', '2023-02-01'],
    ['sv-SE', '2020-02-31', '2020-02-31'],
    ['sv-SE', '2023-02-01', '2023-02-01'],
    ['zh-CN', '2020/02/31', '2020-02-31'],
    ['zh-CN', '2023/02/01', '2023-02-01'],
  ])(
    'should convert %s date string %s to international format %s',
    (locale: string, format: string, expected: string) => {
      const actual = toDateString(format, locale)
      expect(actual).toBe(expected)
    }
  )

  it.each([
    ['en-GB', false, '31/02/2020'],
    ['en-US', false, '02/31/2020'],
    ['de-DE', false, '31.02.2020'],
    ['sv-SE', false, '2020-02-31'],
    ['en-CA', true, '31/02/2020'],
    ['xx-XX', true, '31/02/2020'],
  ])(
    'should throw error if locale is not supported, for locale %s',
    (locale: string, shouldThrow: boolean, format: string) => {
      if (shouldThrow) {
        expect(() => toDateString(format, locale)).toThrow(
          LocaleNotSupportedError
        )
      } else {
        expect(() => toDateString(format, locale)).not.toThrow()
      }
    }
  )

  it.each([
    ['en-GB', '31/02/'],
    ['en-GB', '31/02/20'],
    ['en-GB', '31.2.2020'],
    ['en-US', '02/31/'],
    ['en-US', '02/31/20'],
    ['en-US', '2.31.2020'],
    ['de-DE', '31.02.'],
    ['de-DE', '31.02.20'],
    ['de-DE', '2/31/2020'],
    ['sv-SE', '2020-02-'],
    ['sv-SE', '2020-02-3'],
    ['sv-SE', '2020-02-3'],
    ['sv-SE', '31.2.2020'],
    ['sv-SE', '31/2/2020'],
  ])(
    'should throw invalid date format error for locale %s and format %s',
    (locale: string, format: string) => {
      expect(() => toDateString(format, locale)).toThrow(InvalidDateFormatError)
    }
  )

  it.each([
    ['en-GB', '2020-02-31'],
    ['en-US', '2020-02-31'],
    ['de-DE', '2020-02-31'],
  ])(
    'should allow international format also for locales using other formats',
    (locale: string, format: string) => {
      expect(toDateString(format, locale)).toBe(format)
    }
  )
})
