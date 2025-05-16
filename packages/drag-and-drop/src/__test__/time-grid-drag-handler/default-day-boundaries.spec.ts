/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  beforeEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import CalendarEventBuilder from '@schedule-x/shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { Mock, vi } from 'vitest'
import TimeGridDragHandlerImpl from '../../time-grid-drag-handler.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dragEventNQuarters, getEventWithId } from './utils'
import { deepCloneEvent } from '@schedule-x/shared/src'
import { waitFor } from '@testing-library/preact'

describe('A calendar with normal day boundaries', () => {
  let $app: CalendarAppSingleton
  let clickEvent: MouseEvent
  let eventCopy: CalendarEventInternal
  let updateCopyFn: Mock
  let dayBoundariesDateTime: {
    start: string
    end: string
  }
  let eventCopyElement: HTMLDivElement

  const eventId = 1

  beforeEach(() => {
    $app = __createAppWithViews__({
      selectedDate: '2024-02-02',
    })
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      eventId,
      '2024-02-02 12:00',
      '2024-02-02 13:00'
    ).build()
    $app.calendarEvents.list.value = [calendarEvent]
    eventCopy = deepCloneEvent(calendarEvent, $app)
    eventCopyElement = document.createElement('div')
    eventCopyElement.id = ('time-grid-event-copy-' + eventCopy.id) as string
    $app.elements.calendarWrapper = {
      querySelector: (selector: string) => {
        if (selector === '.sx__time-grid-day') {
          return {
            clientWidth: 100,
          } as HTMLDivElement
        }

        if (selector === '#' + eventCopyElement.id) {
          return eventCopyElement
        }
      },
    } as HTMLDivElement
    clickEvent = {
      clientX: 1000,
      clientY: 1000,
    } as MouseEvent
    updateCopyFn = vi.fn()
    dayBoundariesDateTime = {
      start: '2024-02-02 00:00',
      end: '2024-02-02 24:00',
    }
  })

  describe('Dragging an event vertically in the time grid', () => {
    it('should drag an event to 2 hours later', async () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      const quartersToDrag = 8
      dragEventNQuarters(clickEvent, quartersToDrag, 'down')
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventId, $app)?.start).toEqual('2024-02-02 14:00')
        expect(getEventWithId(eventId, $app)?.end).toEqual('2024-02-02 15:00')
      })
    })

    it('should drag an event to 2 hours and 30 minutes earlier', async () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      const quartersToDrag = 10
      dragEventNQuarters(clickEvent, quartersToDrag, 'up')
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventId, $app)?.start).toEqual('2024-02-02 09:30')
        expect(getEventWithId(eventId, $app)?.end).toEqual('2024-02-02 10:30')
      })
    })

    it('should not be able to drag an event beyond the start of a day', async () => {
      eventCopy.start = '2024-02-02 00:30'
      eventCopy.end = '2024-02-02 01:30'

      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      /**
       * Drag event to 00:15
       * */
      dragEventNQuarters(clickEvent, eventId, 'up')
      expect(updateCopyFn).toHaveBeenCalled()
      expect(eventCopy.start).toBe('2024-02-02 00:15')
      expect(eventCopy.end).toBe('2024-02-02 01:15')

      /**
       * Drag event to 00:00
       * */
      dragEventNQuarters(clickEvent, 2, 'up')
      expect(updateCopyFn).toHaveBeenCalled()
      expect(eventCopy.start).toBe('2024-02-02 00:00')
      expect(eventCopy.end).toBe('2024-02-02 01:00')

      /**
       * Try dragging event to 23:45 (which should do nothing)
       * */
      dragEventNQuarters(clickEvent, 3, 'up')
      expect(updateCopyFn).toHaveBeenCalled()
      expect(eventCopy.start).toBe('2024-02-02 00:00')
      expect(eventCopy.end).toBe('2024-02-02 01:00')

      document.dispatchEvent(new MouseEvent('mouseup'))
      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventCopy.id, $app)?.start).toEqual(
          '2024-02-02 00:00'
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          '2024-02-02 01:00'
        )
      })
    })
  })

  describe('Dragging an event horizontally in the time grid', () => {
    it('should drag an event to the next day', async () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      const daysToDrag = eventId
      const pixelPerDay = 100
      const pixelDiffX = daysToDrag * pixelPerDay
      const event = {
        clientX: clickEvent.clientX + pixelDiffX,
        clientY: clickEvent.clientY,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', event))
      expect(eventCopyElement.style.transform).toBe(
        'translateX(calc(100% + 1px))'
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventCopy.id, $app)?.start).toEqual(
          '2024-02-03 12:00'
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          '2024-02-03 13:00'
        )
      })
    })

    it('should drag an event to the previous day', async () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      const daysToDrag = -eventId
      const pixelPerDay = 100
      const pixelDiffX = daysToDrag * pixelPerDay
      const eventX = clickEvent.clientX + pixelDiffX
      const event = {
        clientX: eventX,
        clientY: clickEvent.clientY,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', event))
      expect(eventCopyElement.style.transform).toEqual(
        'translateX(calc(-100% + -1px))'
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventCopy.id, $app)?.start).toEqual(
          '2024-02-01 12:00'
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          '2024-02-01 13:00'
        )
      })
    })

    it('should not be able to drag an event beyond the end of the week', async () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )
      const pixelPerDay = 100

      /**
       * Drag 1 day to the right, to Saturday
       * */
      let clientX = clickEvent.clientX + pixelPerDay
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: clientX,
          clientY: clickEvent.clientY,
        } as MouseEvent)
      )
      expect(eventCopy.start).toBe('2024-02-03 12:00')
      expect(eventCopy.end).toBe('2024-02-03 13:00')
      expect(eventCopyElement.style.transform).toEqual(
        'translateX(calc(100% + 1px))'
      )

      /**
       * Drag another day to the right, to Sunday
       * */
      clientX += pixelPerDay
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: clientX,
          clientY: clickEvent.clientY,
        } as MouseEvent)
      )
      expect(eventCopy.start).toBe('2024-02-04 12:00')
      expect(eventCopy.end).toBe('2024-02-04 13:00')
      expect(eventCopyElement.style.transform).toEqual(
        'translateX(calc(200% + 2px))'
      )

      /**
       * Try dragging another day (which should do nothing)
       * */
      clientX += pixelPerDay
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: clientX,
          clientY: clickEvent.clientY,
        } as MouseEvent)
      )
      expect(eventCopy.start).toBe('2024-02-04 12:00')
      expect(eventCopy.end).toBe('2024-02-04 13:00')
      expect(eventCopyElement.style.transform).toEqual(
        'translateX(calc(200% + 2px))'
      )

      document.dispatchEvent(new MouseEvent('mouseup'))
      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventCopy.id, $app)?.start).toEqual(
          '2024-02-04 12:00'
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          '2024-02-04 13:00'
        )
      })
    })
  })

  describe('dragging an event horizontally when document has rtl direction', () => {
    it('should drag an event to the next day', async () => {
      $app.config.direction = 'rtl'
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      const daysToDrag = 1
      const pixelPerDay = 100
      const pixelDiffX = daysToDrag * pixelPerDay
      const mouseMoveEvent = {
        clientX: clickEvent.clientX - pixelDiffX,
        clientY: clickEvent.clientY,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))
      expect(eventCopyElement.style.transform).toEqual(
        'translateX(calc(-100% + -1px))'
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventCopy.id, $app)?.start).toEqual(
          '2024-02-03 12:00'
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          '2024-02-03 13:00'
        )
      })
    })
  })

  describe('aborting an update via onBeforeEventUpdate', () => {
    it('should abort the update if onBeforeEventUpdate returns false', async () => {
      $app.config.callbacks.onBeforeEventUpdate = (
        _oldEvent,
        _newEvent,
        $app
      ) => {
        return false
      }
      $app.config.callbacks.onEventUpdate = vi.fn()

      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      const quartersToDrag = 8
      dragEventNQuarters(clickEvent, quartersToDrag, 'down')
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        const originalEvent = getEventWithId(eventId, $app)
        expect(originalEvent?.start).toBe('2024-02-02 12:00')
        expect(originalEvent?.end).toBe('2024-02-02 13:00')
        expect($app.config.callbacks.onEventUpdate).not.toHaveBeenCalled()
      })
    })

    it('should update the event if onBeforeEventUpdate returns true', async () => {
      $app.config.callbacks.onBeforeEventUpdate = (
        _oldEvent,
        _newEvent,
        $app
      ) => {
        return true
      }
      $app.config.callbacks.onEventUpdate = vi.fn()

      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      const quartersToDrag = 8
      dragEventNQuarters(clickEvent, quartersToDrag, 'down')
      document.dispatchEvent(new MouseEvent('mouseup'))

      const originalEvent = getEventWithId(eventId, $app)
      await waitFor(() => {
        expect(originalEvent?.start).toBe('2024-02-02 14:00')
        expect(originalEvent?.end).toBe('2024-02-02 15:00')
        expect(updateCopyFn).toHaveBeenCalled()
        expect($app.config.callbacks.onEventUpdate).toHaveBeenCalled()
      })
    })
  })
})
