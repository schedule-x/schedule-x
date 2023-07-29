import {
  describe,
  expect,
  it,
} from '../../../testing/unit/unit-testing-library.impl'
import {
  toLocalizedMonth,
} from '../date-time-localization'
import { Month } from '../../../../../enums/time/month.enum'

describe('get localized month', () => {
  it.each([
    ['en-US', new Date(2023, Month.JANUARY, 1), 'January'],
    ['de-DE', new Date(2023, Month.JANUARY, 1), 'Januar'],
    ['sv-SE', new Date(2023, Month.JANUARY, 1), 'januari'],
  ])(
    'should get the localized month given a date',
    function (locale: string, date: Date, expected: string) {
      const result = toLocalizedMonth(date, locale)
      expect(result).toEqual(expected)
    }
  )
})

