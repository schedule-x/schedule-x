import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import { toLocalizedMonth } from '../date-time-localization'
import 'temporal-polyfill/global'

describe('get localized month', () => {
  it.each([
    ['en-US', Temporal.PlainDate.from('2023-01-01'), 'January'],
    ['de-DE', Temporal.PlainDate.from('2023-01-01'), 'Januar'],
    ['sv-SE', Temporal.PlainDate.from('2023-01-01'), 'januari'],
  ])(
    'should get the localized month given a date',
    function (locale: string, date: Temporal.PlainDate, expected: string) {
      const result = toLocalizedMonth(date, locale)
      expect(result).toEqual(expected)
    }
  )
})
