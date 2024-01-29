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
import { vi } from 'vitest'

describe('Resizing events in the date grid', () => {
  let $app: CalendarAppSingleton
  let calendarEvent: CalendarEventInternal
  let twoDayEvent: CalendarEventInternal
  let eventStartingInPreviousWeek: CalendarEventInternal

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
    twoDayEvent = new CalendarEventBuilder(
      $app.config,
      2,
      '2024-01-26',
      '2024-01-27'
    ).build()
    eventStartingInPreviousWeek = new CalendarEventBuilder(
      $app.config,
      3,
      '2024-01-21',
      '2024-01-23'
    ).build()
    $app.elements.calendarWrapper = document.createElement('div')
    $app.elements.calendarWrapper.querySelector = (selector: string) => {
      if (selector === '.sx__time-grid-day') {
        return {
          clientWidth: 100,
        }
      }
    }
  })

  describe('Dragging the event to the right', () => {
    it('should resize the event to be one day longer', () => {
      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-26')
      new DateGridEventResizer($app, calendarEvent, 1000)
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 1100,
        })
      )

      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-27')
    })

    it('should not be able to resize beyond the end of the week', () => {
      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-26')
      new DateGridEventResizer($app, calendarEvent, 1000)

      // iteratively move 100px to the right 8 times
      for (let i = 0; i < 8; i++) {
        ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: 1000 + 100 * i,
          })
        )
      }

      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-28')
    })
  })

  describe('Dragging the event to the left', () => {
    it('should be able to resize a two-day event into being a one-day event', () => {
      expect(twoDayEvent.start).toBe('2024-01-26')
      expect(twoDayEvent.end).toBe('2024-01-27')
      new DateGridEventResizer($app, twoDayEvent, 1000)
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 900,
        })
      )

      expect(twoDayEvent.start).toBe('2024-01-26')
      expect(twoDayEvent.end).toBe('2024-01-26')
    })

    it('should not be able to resize beyond the start of the event', () => {
      expect(twoDayEvent.start).toBe('2024-01-26')
      expect(twoDayEvent.end).toBe('2024-01-27')
      new DateGridEventResizer($app, calendarEvent, 1000)
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
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
      new DateGridEventResizer($app, eventStartingInPreviousWeek, 1000)
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 900,
        })
      )
      expect(eventStartingInPreviousWeek.start).toBe('2024-01-21')
      expect(eventStartingInPreviousWeek.end).toBe('2024-01-22')

      // should not be able to resize beyond the start of the week
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 800,
        })
      )
      expect(eventStartingInPreviousWeek.start).toBe('2024-01-21')
      expect(eventStartingInPreviousWeek.end).toBe('2024-01-22')
    })

    it('should call the onEventUpdate callback when the resizing is finished', () => {
      const mockCallback = vi.fn()
      $app.config.callbacks.onEventUpdate = mockCallback
      expect(eventStartingInPreviousWeek.start).toBe('2024-01-21')
      expect(eventStartingInPreviousWeek.end).toBe('2024-01-23')
      new DateGridEventResizer($app, eventStartingInPreviousWeek, 1000)

      // Dispatch 2 mousemove events to prove that the callback is still only called once on mouseup
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 1100,
        })
      )
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
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
