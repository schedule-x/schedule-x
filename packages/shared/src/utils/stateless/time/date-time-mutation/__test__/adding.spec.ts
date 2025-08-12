import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import {
  addDays,
  __deprecated__addMinutes,
  addMonths,
  __deprecated__addYears,
} from '../adding'
import 'temporal-polyfill/global'

describe('adding time', () => {
  it.each([
    [
      Temporal.PlainDate.from('2000-01-01'),
      1,
      Temporal.PlainDate.from('2000-02-01'),
    ],
    [
      Temporal.PlainDate.from('2000-01-01'),
      2,
      Temporal.PlainDate.from('2000-03-01'),
    ],
    [
      Temporal.PlainDate.from('2000-01-01'),
      3,
      Temporal.PlainDate.from('2000-04-01'),
    ],
    [
      Temporal.PlainDate.from('2000-01-01'),
      12,
      Temporal.PlainDate.from('2001-01-01'),
    ],
    [
      Temporal.PlainDate.from('2000-01-01'),
      -1,
      Temporal.PlainDate.from('1999-12-01'),
    ],
    [
      Temporal.PlainDate.from('2000-01-01'),
      -2,
      Temporal.PlainDate.from('1999-11-01'),
    ],
    [
      Temporal.PlainDate.from('2000-01-01'),
      -12,
      Temporal.PlainDate.from('1999-01-01'),
    ],
    [
      Temporal.PlainDate.from('2000-01-01'),
      0,
      Temporal.PlainDate.from('2000-01-01'),
    ],

    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      1,
      Temporal.ZonedDateTime.from(
        '2000-02-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      2,
      Temporal.ZonedDateTime.from(
        '2000-03-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      3,
      Temporal.ZonedDateTime.from(
        '2000-04-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      12,
      Temporal.ZonedDateTime.from(
        '2001-01-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      -1,
      Temporal.ZonedDateTime.from(
        '1999-12-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      -2,
      Temporal.ZonedDateTime.from(
        '1999-11-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      -12,
      Temporal.ZonedDateTime.from(
        '1999-01-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
      0,
      Temporal.ZonedDateTime.from(
        '2000-01-01T00:00:00-05:00[America/New_York]'
      ),
    ],
    [
      Temporal.PlainDate.from('2024-05-31'),
      1,
      Temporal.PlainDate.from('2024-06-30'),
    ],
    [
      Temporal.PlainDate.from('2024-05-31'),
      2,
      Temporal.PlainDate.from('2024-07-31'),
    ],
    [
      Temporal.PlainDate.from('2024-01-31'),
      1,
      Temporal.PlainDate.from('2024-02-29'),
    ],
    [
      Temporal.PlainDate.from('2024-02-29'),
      -1,
      Temporal.PlainDate.from('2024-01-29'),
    ],
    [
      Temporal.PlainDate.from('2024-03-31'),
      -1,
      Temporal.PlainDate.from('2024-02-29'),
    ],
  ])(
    'should add months to date strings & date time strings',
    (timeSpecification, add, expectedResult) => {
      expect(addMonths(timeSpecification, add)).toEqual(expectedResult)
    }
  )

  it.each([
    [
      Temporal.PlainDate.from('2020-01-01'),
      1,
      Temporal.PlainDate.from('2020-01-02'),
    ],
    [
      Temporal.PlainDate.from('2020-01-01'),
      -1,
      Temporal.PlainDate.from('2019-12-31'),
    ],
    [
      Temporal.PlainDate.from('2020-01-31 00:00'),
      1,
      Temporal.PlainDate.from('2020-02-01 00:00'),
    ],
  ])(
    'should add days to date strings & date time strings',
    (oldDate, daysPlus, newDate) => {
      expect(addDays(oldDate, daysPlus)).toEqual(newDate)
    }
  )

  it.each([
    ['2020-01-01', 1, '2021-01-01'],
    ['2020-01-01', -1, '2019-01-01'],
    ['2020-01-31 04:00', 1, '2021-01-31 04:00'],
  ])(
    'should add years to date strings & date time strings',
    (oldDate, yearsPlus, newDate) => {
      expect(__deprecated__addYears(oldDate, yearsPlus)).toBe(newDate)
    }
  )

  it.each([
    ['2020-01-01 00:00', 1, '2020-01-01 00:01'],
    ['2020-01-01 00:00', -1, '2019-12-31 23:59'],
    ['2025-11-01 12:30', 1440, '2025-11-02 12:30'],
    ['2025-11-01 12:30', -10080, '2025-10-25 12:30'],
    ['2025-11-01', 10080, '2025-11-08'],
  ])(
    'should add minutes to date strings & date time strings',
    (oldDate, minutesPlus, newDate) => {
      expect(__deprecated__addMinutes(oldDate, minutesPlus)).toEqual(newDate)
    }
  )
})
