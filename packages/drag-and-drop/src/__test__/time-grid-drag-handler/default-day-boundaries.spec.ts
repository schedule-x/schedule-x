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
import 'temporal-polyfill/global'

describe('A calendar with normal day boundaries', () => {
  let $app: CalendarAppSingleton
  let clickEvent: MouseEvent
  let eventCopy: CalendarEventInternal
  let eventCopyWithDifferentTimezone: CalendarEventInternal
  let updateCopyFn: Mock
  let dayBoundariesDateTime: {
    start: Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime
  }
  let eventCopyElement: HTMLDivElement

  const eventId = 1

  beforeEach(() => {
    $app = __createAppWithViews__({
      selectedDate: Temporal.PlainDate.from('2024-02-02'),
      timezone: 'UTC',
    })
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      eventId,
      Temporal.ZonedDateTime.from('2024-02-02T12:00:00+00:00[UTC]'),
      Temporal.ZonedDateTime.from('2024-02-02T13:00:00+00:00[UTC]')
    ).build()
    const calendarEventWithDifferentTimezone = new CalendarEventBuilder(
      $app.config,
      eventId,
      Temporal.ZonedDateTime.from('2024-02-02T12:00:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2024-02-02T13:00:00+01:00[Europe/Berlin]')
    ).build()
    $app.calendarEvents.list.value = [
      calendarEvent,
      calendarEventWithDifferentTimezone,
    ]
    eventCopy = deepCloneEvent(calendarEvent, $app)
    eventCopyWithDifferentTimezone = deepCloneEvent(
      calendarEventWithDifferentTimezone,
      $app
    )
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
      start: Temporal.ZonedDateTime.from('2024-02-02T00:00:00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2024-02-02T23:59:00+00:00[UTC]'),
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
        expect(getEventWithId(eventId, $app)?.start).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T14:00:00+00:00[UTC]')
        )
        expect(getEventWithId(eventId, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T15:00:00+00:00[UTC]')
        )
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
        expect(getEventWithId(eventId, $app)?.start).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T09:30:00+00:00[UTC]')
        )
        expect(getEventWithId(eventId, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T10:30:00+00:00[UTC]')
        )
      })
    })

    it('should not be able to drag an event beyond the start of a day', async () => {
      eventCopy.start = Temporal.ZonedDateTime.from(
        '2024-02-02T00:30:00+00:00[UTC]'
      )
      eventCopy.end = Temporal.ZonedDateTime.from(
        '2024-02-02T01:30:00+00:00[UTC]'
      )

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
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02T00:15:00+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02T01:15:00+00:00[UTC]')
      )

      /**
       * Drag event to 00:00
       * */
      dragEventNQuarters(clickEvent, 2, 'up')
      expect(updateCopyFn).toHaveBeenCalled()
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02T00:00:00+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02T01:00:00+00:00[UTC]')
      )

      /**
       * Try dragging event to 23:45 (which should do nothing)
       * */
      dragEventNQuarters(clickEvent, 3, 'up')
      expect(updateCopyFn).toHaveBeenCalled()
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02T00:00:00+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02T01:00:00+00:00[UTC]')
      )

      document.dispatchEvent(new MouseEvent('mouseup'))
      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventCopy.id, $app)?.start).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T00:00:00+00:00[UTC]')
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T01:00:00+00:00[UTC]')
        )
      })
    })

    it('should keep the original timezone of the event when returned from onEventUpdate', async () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopyWithDifferentTimezone,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )
      $app.config.callbacks.onEventUpdate = vi.fn()

      const quartersToDrag = 8
      dragEventNQuarters(clickEvent, quartersToDrag, 'down')
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventId, $app)?.start).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T13:00:00+00:00[UTC]')
        )
        expect(getEventWithId(eventId, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T14:00:00+00:00[UTC]')
        )
        expect($app.config.callbacks.onEventUpdate).toHaveBeenCalledWith({
          id: eventId,
          start: Temporal.ZonedDateTime.from(
            '2024-02-02T14:00:00+01:00[Europe/Berlin]'
          ),
          end: Temporal.ZonedDateTime.from(
            '2024-02-02T15:00:00+01:00[Europe/Berlin]'
          ),
        })
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
          Temporal.ZonedDateTime.from('2024-02-03T12:00:00+00:00[UTC]')
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-03T13:00:00+00:00[UTC]')
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
          Temporal.ZonedDateTime.from('2024-02-01T12:00:00+00:00[UTC]')
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-01T13:00:00+00:00[UTC]')
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
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-03T12:00:00+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-03T13:00:00+00:00[UTC]')
      )
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
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-04T12:00:00+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-04T13:00:00+00:00[UTC]')
      )
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
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-04T12:00:00+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-04T13:00:00+00:00[UTC]')
      )
      expect(eventCopyElement.style.transform).toEqual(
        'translateX(calc(200% + 2px))'
      )

      document.dispatchEvent(new MouseEvent('mouseup'))
      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
        expect(getEventWithId(eventCopy.id, $app)?.start).toEqual(
          Temporal.ZonedDateTime.from('2024-02-04T12:00:00+00:00[UTC]')
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-04T13:00:00+00:00[UTC]')
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
          Temporal.ZonedDateTime.from('2024-02-03T12:00:00+00:00[UTC]')
        )
        expect(getEventWithId(eventCopy.id, $app)?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-03T13:00:00+00:00[UTC]')
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
        expect(originalEvent?.start).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T12:00:00+00:00[UTC]')
        )
        expect(originalEvent?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T13:00:00+00:00[UTC]')
        )
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
        expect(originalEvent?.start).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T14:00:00+00:00[UTC]')
        )
        expect(originalEvent?.end).toEqual(
          Temporal.ZonedDateTime.from('2024-02-02T15:00:00+00:00[UTC]')
        )
        expect(updateCopyFn).toHaveBeenCalled()
        expect($app.config.callbacks.onEventUpdate).toHaveBeenCalledWith({
          id: eventId,
          start: Temporal.ZonedDateTime.from('2024-02-02T14:00:00+00:00[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-02-02T15:00:00+00:00[UTC]'),
        })
      })
    })
  })
})
