import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { expect } from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

export const assertIsSingleDayTimedAndHybridDayTimed = (
  calendarEvent: CalendarEventInternal
) => {
  expect(calendarEvent._isSingleDayTimed).toBe(true)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(false)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(true)
}
export const assertIsSingleHybridTimedAndMultipleDayTimed = (
  calendarEvent: CalendarEventInternal
) => {
  expect(calendarEvent._isSingleDayTimed).toBe(false)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(true)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(true)
}
export const assertIsSingleDayTimed = (
  calendarEvent: CalendarEventInternal
) => {
  expect(calendarEvent._isSingleDayTimed).toBe(true)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(false)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
}
export const assertIsMultiDayTimed = (calendarEvent: CalendarEventInternal) => {
  expect(calendarEvent._isSingleDayTimed).toBe(false)
  expect(calendarEvent._isSingleDayFullDay).toBe(false)
  expect(calendarEvent._isMultiDayTimed).toBe(true)
  expect(calendarEvent._isMultiDayFullDay).toBe(false)
  expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
}
