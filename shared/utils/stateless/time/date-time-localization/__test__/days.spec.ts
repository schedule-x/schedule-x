import {
  describe,
  expect,
  it,
} from '../../../testing/unit/unit-testing-library.impl.ts'
import TimeUnitsBuilder from '../../../../stateful/time-units/time-units.builder.ts'
import { WeekDay } from '../../../../../enums/time/week-day.enum.ts'
import { getDayNamesShort, getOneLetterDayNames } from '../date-time-localization.ts'
import { Month } from '../../../../../enums/time/month.enum.ts'

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

  it('should get short day names in Chinese', () => {
    const underTest = getDayNamesShort
    const date = new Date(2023, Month.JANUARY, 1)
    const week = timeUnitsImpl.getWeekFor(date)

    const result = underTest(week, 'zh-CN')

    expect(result[0]).toBe('周一')
    expect(result[1]).toBe('周二')
    expect(result[2]).toBe('周三')
    expect(result[3]).toBe('周四')
    expect(result[4]).toBe('周五')
    expect(result[5]).toBe('周六')
    expect(result[6]).toBe('周日')
  })
})
