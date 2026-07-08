import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import {
  getEventHeight,
  getInlineStartRule,
  getWidthRule,
} from '../event-styles'
import { stubInterface } from 'ts-sinon'
import { CalendarEventInternal } from '@schedule-x/shared'

describe('Event styles', () => {
  describe('getting the event height', () => {
    it('should give zero-minute events a height when start and end are the same point in time', () => {
      const eventHeight = getEventHeight(
        Temporal.ZonedDateTime.from('2020-01-01T10:00:00[Europe/Stockholm]'),
        Temporal.ZonedDateTime.from('2020-01-01T10:00:00[Europe/Stockholm]'),
        {
          start: 0,
          end: 2400,
        },
        2400
      )

      expect(eventHeight).toBeCloseTo(2.0833333333333335)
    })
  })

  describe('getting the event width', () => {
    it.each([
      [0, 100, 2, false, 50],
      [0, 90, 2, true, 90],
      [50, 100, 1, false, 100],
      [50, 90, 2, true, 40],
    ])(
      'should return the correct width',
      (
        leftRule,
        eventWidth,
        maxConcurrentEvents,
        eventOverlap,
        expectedWidth
      ) => {
        expect(
          getWidthRule(leftRule, eventWidth, maxConcurrentEvents, eventOverlap)
        ).toBe(expectedWidth)
      }
    )
  })

  describe('getting the left rule', () => {
    it('should place an event to the left of a day if there are no concurrent events', () => {
      const calendarEvent = stubInterface<CalendarEventInternal>()
      calendarEvent._maxConcurrentEvents = undefined
      calendarEvent._previousConcurrentEvents = undefined

      const result = getInlineStartRule(calendarEvent, 100)

      expect(result).toBe(0)
    })

    it('should place ab event to the left of a day if there are concurrent events, but the event is the first one', () => {
      const calendarEvent = stubInterface<CalendarEventInternal>()
      calendarEvent._maxConcurrentEvents = 2
      calendarEvent._previousConcurrentEvents = 0

      const result = getInlineStartRule(calendarEvent, 100)

      expect(result).toBe(0)
    })

    it('should place the event at 50% of the day if there are concurrent events and the event is the second one of two', () => {
      const calendarEvent = stubInterface<CalendarEventInternal>()
      calendarEvent._maxConcurrentEvents = 2
      calendarEvent._previousConcurrentEvents = 1

      const result = getInlineStartRule(calendarEvent, 100)

      expect(result).toBe(50)
    })

    it('should place the event at 50% of the day if there are concurrent events and the event is the third one of four', () => {
      const calendarEvent = stubInterface<CalendarEventInternal>()
      calendarEvent._maxConcurrentEvents = 4
      calendarEvent._previousConcurrentEvents = 2

      const result = getInlineStartRule(calendarEvent, 100)

      expect(result).toBe(50)
    })

    it('should place the event at 45% of the day if the event is the second of two, and dayWidth is 90', () => {
      const calendarEvent = stubInterface<CalendarEventInternal>()
      calendarEvent._maxConcurrentEvents = 2
      calendarEvent._previousConcurrentEvents = 1

      const result = getInlineStartRule(calendarEvent, 90)

      expect(result).toBe(45)
    })
  })
})
