import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import { isSameMonth, isToday } from '../index'
import 'temporal-polyfill/global'

describe('comparison of time', () => {
  it('should return true if date is today', () => {
    const today = Temporal.PlainDate.from(Temporal.Now.plainDateISO())
    expect(isToday(today)).toBe(true)
  })

  it('should return false if date is not today', () => {
    const yesterday = Temporal.PlainDate.from(Temporal.Now.plainDateISO().subtract({ days: 1 }))
    expect(isToday(yesterday)).toBe(false)
  })

  it('should return false if date is not today', () => {
    const tomorrow = Temporal.PlainDate.from(Temporal.Now.plainDateISO().add({ days: 1 }))
    expect(isToday(tomorrow)).toBe(false)
  })

  it.each([
    [Temporal.PlainDate.from('2000-01-01'), Temporal.PlainDate.from('2000-01-01'), true],
    [Temporal.PlainDate.from('2000-01-01'), Temporal.PlainDate.from('2000-01-31'), true],
    [Temporal.PlainDate.from('2000-01-01'), Temporal.PlainDate.from('2000-02-01'), false],
    [Temporal.PlainDate.from('2000-01-01'), Temporal.PlainDate.from('2001-01-01'), false],
  ])(
    'should return true if two dates are in the same month',
    (date1: Temporal.PlainDate, date2: Temporal.PlainDate, isTrue: boolean) => {
      expect(isSameMonth(date1, date2)).toBe(isTrue)
    }
  )
})
