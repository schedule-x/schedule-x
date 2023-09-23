import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import { toLocalizedDateString } from '../date-time-localization'

describe('localizing date strings', () => {
  const dateParam = new Date(2020, 11, 31)

  it.each([
    [dateParam, 'en-GB', '31/12/2020'],
    [dateParam, 'en-US', '12/31/2020'],
    [dateParam, 'de-DE', '31.12.2020'],
    [dateParam, 'sv-SE', '2020-12-31'],
  ])(
    'should convert date to localized date string',
    (date: Date, locale: string, expected: string) => {
      const actual = toLocalizedDateString(date, locale)
      expect(actual).toBe(expected)
    }
  )
})
