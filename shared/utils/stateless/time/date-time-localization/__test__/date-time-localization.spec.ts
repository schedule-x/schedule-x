import {
  describe,
  expect,
  it,
} from '../../../testing/unit/unit-testing-library.impl.ts'
import {
  getOneLetterDayNames,
  toLocalizedMonth,
} from '../date-time-localization.ts'
import { Month } from '../../../../../enums/time/month.enum.ts'
import TimeUnitsBuilder from '../../../../stateful/time-units/time-units.builder.ts'
import { WeekDay } from '../../../../../enums/time/week-day.enum.ts'

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

describe('get localized day names', () => {
  const timeUnitsImpl = new TimeUnitsBuilder()
    .withFirstDayOfWeek(WeekDay.MONDAY)
    .build()

  it('should get one letter day names in English', () => {
    const underTest = getOneLetterDayNames
    const date = new Date(2023, Month.JANUARY, 1)
    const week = timeUnitsImpl.getWeekFor(date)

    const result = underTest(week, 'en-US')

    expect(result[0]).toBe('M')
    expect(result[1]).toBe('T')
    expect(result[2]).toBe('W')
    expect(result[3]).toBe('T')
    expect(result[4]).toBe('F')
    expect(result[5]).toBe('S')
    expect(result[6]).toBe('S')
  })

  it('should get one letter day names in German', () => {
    const underTest = getOneLetterDayNames
    const date = new Date(2023, Month.JANUARY, 1)
    const week = timeUnitsImpl.getWeekFor(date)

    const result = underTest(week, 'de-DE')

    expect(result[0]).toBe('M')
    expect(result[1]).toBe('D')
    expect(result[2]).toBe('M')
    expect(result[3]).toBe('D')
    expect(result[4]).toBe('F')
    expect(result[5]).toBe('S')
    expect(result[6]).toBe('S')
  })

  it('should get one letter day names in English, for a week starting on Sunday', () => {
    const timeUnitsImplUS = new TimeUnitsBuilder()
      .withFirstDayOfWeek(WeekDay.SUNDAY)
      .build()
    const underTest = getOneLetterDayNames
    const date = new Date(2023, Month.JANUARY, 1)
    const week = timeUnitsImplUS.getWeekFor(date)

    const result = underTest(week, 'en-US')

    expect(result[0]).toBe('S')
    expect(result[1]).toBe('M')
    expect(result[2]).toBe('T')
    expect(result[3]).toBe('W')
    expect(result[4]).toBe('T')
    expect(result[5]).toBe('F')
    expect(result[6]).toBe('S')
  })
})
