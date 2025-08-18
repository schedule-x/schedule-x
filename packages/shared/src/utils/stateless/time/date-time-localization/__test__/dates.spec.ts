import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import { toLocalizedDate } from '../date-time-localization'

describe('get localized date', () => {
  it.each([
    ['en-US', new Date(2023, 0, 1), 'January 1, 2023'],
    ['de-DE', new Date(2023, 0, 1), '1. Januar 2023'],
    ['sv-SE', new Date(2023, 0, 1), '1 januari 2023'],
    ['zh-CN', new Date(2023, 0, 1), '2023年1月1日'],
  ])(
    'should get a localized date string for locale %s',
    (locale, date, expectedResult) => {
      expect(toLocalizedDate(date, locale)).toBe(expectedResult)
    }
  )
})
