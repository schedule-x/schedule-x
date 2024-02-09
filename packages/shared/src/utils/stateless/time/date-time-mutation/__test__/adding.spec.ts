import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import { addDays, addMonths, addYears } from '../adding'

describe('adding months to time specifications', () => {
  it.each([
    // date strings
    ['2000-01-01', 1, '2000-02-01'],
    ['2000-01-01', 2, '2000-03-01'],
    ['2000-01-01', 3, '2000-04-01'],
    ['2000-01-01', 12, '2001-01-01'],
    ['2000-01-01', -1, '1999-12-01'],
    ['2000-01-01', -2, '1999-11-01'],
    ['2000-01-01', -12, '1999-01-01'],
    ['2000-01-01', 0, '2000-01-01'],
    // date time strings
    ['2000-01-01 00:00', 1, '2000-02-01 00:00'],
    ['2000-01-01 00:00', 2, '2000-03-01 00:00'],
    ['2000-01-01 00:00', 3, '2000-04-01 00:00'],
    ['2000-01-01 00:00', 12, '2001-01-01 00:00'],
    ['2000-01-01 00:00', -1, '1999-12-01 00:00'],
    ['2000-01-01 00:00', -2, '1999-11-01 00:00'],
    ['2000-01-01 00:00', -12, '1999-01-01 00:00'],
    ['2000-01-01 00:00', 0, '2000-01-01 00:00'],
  ])(
    'should add months to date strings & date time strings',
    (timeSpecification, add, expectedResult) => {
      expect(addMonths(timeSpecification, add)).toBe(expectedResult)
    }
  )

  it.each([
    ['2020-01-01', 1, '2020-01-02'],
    ['2020-01-01', -1, '2019-12-31'],
    ['2020-01-31 00:00', 1, '2020-02-01 00:00'],
  ])(
    'should add days to date strings & date time strings',
    (oldDate, daysPlus, newDate) => {
      expect(addDays(oldDate, daysPlus)).toBe(newDate)
    }
  )

  it.each([
    ['2020-01-01', 1, '2021-01-01'],
    ['2020-01-01', -1, '2019-01-01'],
    ['2020-01-31 04:00', 1, '2021-01-31 04:00'],
  ])(
    'should add years to date strings & date time strings',
    (oldDate, yearsPlus, newDate) => {
      expect(addYears(oldDate, yearsPlus)).toBe(newDate)
    }
  )
})
