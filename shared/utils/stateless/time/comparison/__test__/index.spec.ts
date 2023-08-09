import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl.ts'
import { isToday } from '../index.ts'

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
})
