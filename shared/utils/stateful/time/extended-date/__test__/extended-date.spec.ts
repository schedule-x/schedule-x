import {
  describe,
  it,
  expect,
} from '../../../../stateless/testing/unit/unit-testing-library.impl.ts'
import ExtendedDateImpl from '../extended-date.impl.ts'
import { Month } from '../../../../../enums/time/month.enum.ts'
import { NoYearZeroError } from '../../../../stateless/errors/no-year-zero.error.ts'

describe('ExtendedDateImpl', () => {
  it('should be able to destructure an extended date into year, month and date', () => {
    const expectedYear = 2020
    const expectedMonth = Month.JULY
    const expectedDate = 2
    const underTest = new ExtendedDateImpl(
      expectedYear,
      expectedMonth,
      expectedDate
    )

    const { year, month, date } = underTest

    expect(year).toBe(expectedYear)
    expect(month).toBe(expectedMonth)
    expect(date).toBe(expectedDate)
  })

  it('should throw error for entering year 0', () => {
    expect(() => new ExtendedDateImpl(0, Month.JANUARY, 1)).toThrow(
      NoYearZeroError
    )
  })

  it.each([[-10], [-1], [1], [99], [100], [2023]])(
    'should set year %s',
    (year) => {
      const underTest = new ExtendedDateImpl(year, Month.JANUARY, 1)

      expect(underTest.year).toBe(year)
    }
  )
})
