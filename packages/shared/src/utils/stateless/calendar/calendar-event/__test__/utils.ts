import { CalendarEventInternal } from '../../../../../interfaces/calendar/calendar-event.interface'
import { expect } from '../../../testing/unit/unit-testing-library.impl'

export const assertIsSingleDayTimedAndHybridDayTimed = (
  calendarEvent: CalendarEventInternal
) => {
  expect(calendarEvent._isSingleDayTimed).toBe(true)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(false)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(true)
  expect(calendarEvent._isSingleTime).toBe(false)
}
export const assertIsSingleHybridTimedAndMultipleDayTimed = (
  calendarEvent: CalendarEventInternal
) => {
  expect(calendarEvent._isSingleDayTimed).toBe(false)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(true)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(true)
  expect(calendarEvent._isSingleTime).toBe(false)
}
export const assertIsSingleDayTimed = (
  calendarEvent: CalendarEventInternal
) => {
  expect(calendarEvent._isSingleDayTimed).toBe(true)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(false)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
  expect(calendarEvent._isSingleTime).toBe(false)
}
export const assertIsMultiDayTimed = (calendarEvent: CalendarEventInternal) => {
  expect(calendarEvent._isSingleDayTimed).toBe(false)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(true)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
  expect(calendarEvent._isSingleTime).toBe(false)
}
export const assertIsSingleTime = (calendarEvent: CalendarEventInternal) => {
  expect(calendarEvent._isSingleDayTimed).toBe(false)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(false)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
  expect(calendarEvent._isSingleTime).toBe(true)
}
