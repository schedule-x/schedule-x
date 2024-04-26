/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '@schedule-x/shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { DateGridEventResizer } from '../date-grid-event-resizer'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { Mock, vi } from 'vitest'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'

describe('Resizing events in the date grid', () => {
  let $app: CalendarAppSingleton
  let calendarEvent: CalendarEventInternal
  let eventCopy: CalendarEventInternal
  let eventUpdater: Mock
  let twoDayEvent: CalendarEventInternal
  let twoDayEventCopy: CalendarEventInternal
  let eventStartingInPreviousWeek: CalendarEventInternal
  let eventStartingInPreviousWeekCopy: CalendarEventInternal
  let calendarWrapper: HTMLDivElement

  beforeEach(() => {
    $app = __createAppWithViews__({
      selectedDate: '2024-01-26',
    })
    calendarEvent = new CalendarEventBuilder(
      $app.config,
      1,
      '2024-01-26',
      '2024-01-26'
    ).build()
    $app.calendarEvents.list.value.push(calendarEvent)
    eventCopy = deepCloneEvent(calendarEvent, $app)
    eventUpdater = vi.fn()
    twoDayEvent = new CalendarEventBuilder(
      $app.config,
      2,
      '2024-01-26',
      '2024-01-27'
    ).build()
    $app.calendarEvents.list.value.push(twoDayEvent)
    twoDayEventCopy = deepCloneEvent(twoDayEvent, $app)
    eventStartingInPreviousWeek = new CalendarEventBuilder(
      $app.config,
      3,
      '2024-01-21',
      '2024-01-23'
    ).build()
    $app.calendarEvents.list.value.push(eventStartingInPreviousWeek)
    eventStartingInPreviousWeekCopy = deepCloneEvent(
      eventStartingInPreviousWeek,
      $app
    )
    $app.elements.calendarWrapper = document.createElement('div')
    $app.elements.calendarWrapper.querySelector = (selector: string) => {
      if (selector === '.sx__time-grid-day') {
        return {
          clientWidth: 100,
        }
      }
    }
    calendarWrapper = $app.elements.calendarWrapper
  })

  describe('When the calendar wrapper is not found in', () => {
    it('should not throw an error', () => {
      $app.elements.calendarWrapper = undefined
      expect(() => {
        new DateGridEventResizer($app, eventCopy, eventUpdater, 1000)
      }).not.toThrow()
    })
  })

  describe('Dragging the event to the right', () => {
    it('should resize the event to be one day longer', () => {
      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-26')

      new DateGridEventResizer($app, eventCopy, eventUpdater, 1000)
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 1100,
        })
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-27')
    })

    it('should not be able to resize beyond the end of the week', () => {
      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-26')
      new DateGridEventResizer($app, eventCopy, eventUpdater, 1000)

      // iteratively move 100px to the right 8 times
      for (let i = 0; i < 8; i++) {
        calendarWrapper.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: 1000 + 100 * i,
          })
        )
      }
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-28')
    })
  })

  describe('Dragging the event to the left', () => {
    it('should be able to resize a two-day event into being a one-day event', () => {
      expect(twoDayEvent.start).toBe('2024-01-26')
      expect(twoDayEvent.end).toBe('2024-01-27')
      new DateGridEventResizer($app, twoDayEventCopy, eventUpdater, 1000)
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 900,
        })
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(twoDayEvent.start).toBe('2024-01-26')
      expect(twoDayEvent.end).toBe('2024-01-26')
    })

    it('should not be able to resize beyond the start of the event', () => {
      expect(twoDayEvent.start).toBe('2024-01-26')
      expect(twoDayEvent.end).toBe('2024-01-27')

      new DateGridEventResizer($app, eventCopy, eventUpdater, 1000)
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 900,
        })
      )

      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-26')
    })

    it('should not be able to resize beyond the start of the week, if the event starts in the previous week', () => {
      expect(eventStartingInPreviousWeek.start).toBe('2024-01-21')
      expect(eventStartingInPreviousWeek.end).toBe('2024-01-23')
      // should first be able to resize one day to the left
      new DateGridEventResizer(
        $app,
        eventStartingInPreviousWeekCopy,
        eventUpdater,
        1000
      )
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 900,
        })
      )

      // should not be able to resize beyond the start of the week
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 800,
        })
      )
      document.dispatchEvent(new MouseEvent('mouseup'))
      expect(eventStartingInPreviousWeek.start).toBe('2024-01-21')
      expect(eventStartingInPreviousWeek.end).toBe('2024-01-22')
    })

    it('should call the onEventUpdate callback when the resizing is finished', () => {
      const mockCallback = vi.fn()
      $app.config.callbacks.onEventUpdate = mockCallback
      expect(eventStartingInPreviousWeek.start).toBe('2024-01-21')
      expect(eventStartingInPreviousWeek.end).toBe('2024-01-23')
      new DateGridEventResizer(
        $app,
        eventStartingInPreviousWeekCopy,
        eventUpdater,
        1000
      )

      // Dispatch 2 mousemove events to prove that the callback is still only called once on mouseup
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 1100,
        })
      )
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 1200,
        })
      )
      document.dispatchEvent(
        new MouseEvent('mouseup', {
          clientX: 1200,
        })
      )

      expect(mockCallback).toHaveBeenCalledTimes(1)
      expect(mockCallback).toHaveBeenCalledWith(
        eventStartingInPreviousWeek._getExternalEvent()
      )
    })
  })
})
