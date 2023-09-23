import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import { isSameMonth, isToday } from '../index'

describe('comparison of time', () => {
  it('should return true if date is today', () => {
    const today = new Date()
    expect(isToday(today)).toBe(true)
  })

  it('should return false if date is not today', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(isToday(yesterday)).toBe(false)
  })

  it('should return false if date is not today', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    expect(isToday(tomorrow)).toBe(false)
  })

  it.each([
    [new Date(2000, 0, 1), new Date(2000, 0, 1), true],
    [new Date(2000, 0, 1), new Date(2000, 0, 31), true],
    [new Date(2000, 0, 1), new Date(2000, 1, 1), false],
    [new Date(2000, 0, 1), new Date(2001, 0, 1), false],
  ])(
    'should return true if two dates are in the same month',
    (date1: Date, date2: Date, isTrue: boolean) => {
      expect(isSameMonth(date1, date2)).toBe(isTrue)
    }
  )
})
