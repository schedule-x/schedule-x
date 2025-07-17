/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { Mock, vi } from 'vitest'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import CalendarEventBuilder from '@schedule-x/shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import DateGridDragHandlerImpl from '../../date-grid-drag-handler.impl'
import { getEventWithId } from '../time-grid-drag-handler/utils'
import { deepCloneEvent } from '@schedule-x/shared/src'
import { waitFor } from '@testing-library/preact'


describe('A calendar with custom, non-hybrid day boundaries', () => {
  let $app: CalendarAppSingleton
  let eventCopy: CalendarEventInternal
  let updateCopyFn: Mock
  let eventId: string | number
  let eventCoordinates: { clientX: number; clientY: number }

  beforeEach(() => {
    vi.useFakeTimers()
    $app = __createAppWithViews__({
      selectedDate: Temporal.PlainDate.from('2024-02-23'),
      dayBoundaries: {
        start: '00:00',
        end: '23:59',
      },
      timezone: 'UTC',
    })
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.ZonedDateTime.from('2024-02-23 03:30+00:00[UTC]'),
      Temporal.ZonedDateTime.from('2024-02-24 04:00+00:00[UTC]')
    ).build()
    eventId = calendarEvent.id
    $app.calendarEvents.list.value = [calendarEvent]
    eventCopy = deepCloneEvent(calendarEvent, $app)
    $app.elements.calendarWrapper = {
      querySelector: (selector: string) => {
        if (selector === '.sx__time-grid-day') {
          return {
            clientWidth: 100,
          } as HTMLDivElement
        }

        return document.createElement('div')
      },
    } as HTMLDivElement
    eventCoordinates = {
      clientX: 1000,
      clientY: 1000,
    } as MouseEvent
    updateCopyFn = vi.fn()
  })

  describe('Dragging an event one day to the right, when possible', () => {
    it('should update the event to one day later', async () => {
      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))

      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-24 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-25 04:00:00+00:00[UTC]'))
      expect(updateCopyFn).toHaveBeenCalled()

      document.dispatchEvent(new MouseEvent('mouseup'))
      await vi.runAllTimersAsync()

      await waitFor(() => {
        expect(getEventWithId(eventId, $app)?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-24 03:30:00+00:00[UTC]'))
        expect(getEventWithId(eventId, $app)?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-25 04:00:00+00:00[UTC]'))
        expect(updateCopyFn).toHaveBeenCalledTimes(2)
        expect(updateCopyFn).toHaveBeenCalledWith(undefined) // Test removing the event copy once the drag is done
      })
    })
  })

  describe('Dragging an event one day to the left, when possible', () => {
    it('should update the event to one day earlier', async () => {
      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX - 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))

      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-22 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-23 04:00:00+00:00[UTC]'))
      expect(updateCopyFn).toHaveBeenCalled()

      document.dispatchEvent(new MouseEvent('mouseup'))
      await vi.runAllTimersAsync()

      await waitFor(() => {
        expect(getEventWithId(eventId, $app)?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-22 03:30:00+00:00[UTC]'))
        expect(getEventWithId(eventId, $app)?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-23 04:00:00+00:00[UTC]'))
        expect(updateCopyFn).toHaveBeenCalledTimes(2)
        expect(updateCopyFn).toHaveBeenCalledWith(undefined) // Test removing the event copy once the drag is done
      })
    })
  })

  describe('Dragging two days to the right, when possible', () => {
    it('should update the event to two days later', async () => {
      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent1 = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent1))
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-24 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-25 04:00:00+00:00[UTC]'))

      const mouseMoveEvent2 = {
        clientX: eventCoordinates.clientX + 200,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent2))
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-25 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-26 04:00:00+00:00[UTC]'))

      document.dispatchEvent(new MouseEvent('mouseup'))

      await vi.runAllTimersAsync()

      await waitFor(() => {
        expect(getEventWithId(eventId, $app)?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-25 03:30:00+00:00[UTC]'))
        expect(getEventWithId(eventId, $app)?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-26 04:00:00+00:00[UTC]'))
        expect(updateCopyFn).toHaveBeenCalledTimes(3)
        expect(updateCopyFn).toHaveBeenCalledWith(undefined) // Test removing the event copy once the drag is done
      })
    })
  })

  describe('Trying to drag 3 days to the right, but only 2 days are possible', () => {
    it('should update the event to two days later', async () => {
      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent1 = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent1))
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-24 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-25 04:00:00+00:00[UTC]'))

      const mouseMoveEvent2 = {
        clientX: eventCoordinates.clientX + 200,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent2))
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-25 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-26 04:00:00+00:00[UTC]'))

      const mouseMoveEvent3 = {
        clientX: eventCoordinates.clientX + 300,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent3))
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-25 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-26 04:00:00+00:00[UTC]'))

      document.dispatchEvent(new MouseEvent('mouseup'))

      await vi.runAllTimersAsync()

      await waitFor(() => {
        expect(getEventWithId(eventId, $app)?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-25 03:30:00+00:00[UTC]'))
        expect(getEventWithId(eventId, $app)?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-26 04:00:00+00:00[UTC]'))
        expect(updateCopyFn).toHaveBeenCalledTimes(3)
        expect(updateCopyFn).toHaveBeenCalledWith(undefined) // Test removing the event copy once the drag is done
      })
    })
  })

  describe('aborting an update via onBeforeEventUpdate', () => {
    it('should not update the event if the callback returns false', () => {
      $app.config.callbacks.onBeforeEventUpdate = (
        _oldEvent,
        _newEvent,
        $app
      ) => {
        return false
      }
      $app.config.callbacks.onEventUpdate = vi.fn()

      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))
      document.dispatchEvent(new MouseEvent('mouseup'))

      const originalEvent = getEventWithId(eventId, $app)
      expect(originalEvent?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-23 03:30:00+00:00[UTC]'))
      expect(originalEvent?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-24 04:00:00+00:00[UTC]'))
      expect($app.config.callbacks.onEventUpdate).not.toHaveBeenCalled()
    })

    it('should update the event if the callback returns true', async () => {
      $app.config.callbacks.onBeforeEventUpdate = (
        _oldEvent,
        _newEvent,
        $app
      ) => {
        return true
      }
      $app.config.callbacks.onEventUpdate = vi.fn()

      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))
      document.dispatchEvent(new MouseEvent('mouseup'))
      await vi.runAllTimersAsync()

      await waitFor(() => {
        const originalEvent = getEventWithId(eventId, $app)
        expect(originalEvent?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-24 03:30:00+00:00[UTC]'))
        expect(originalEvent?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-25 04:00:00+00:00[UTC]'))
        expect(updateCopyFn).toHaveBeenCalled()
        expect($app.config.callbacks.onEventUpdate).toHaveBeenCalled()
      })
    })
  })

  describe('aborting an update via onBeforeEventUpdateAsync', () => {
    it('should not update the event if the callback returns false', async () => {
      $app.config.callbacks.onBeforeEventUpdateAsync = async (
        _oldEvent,
        _newEvent,
        $app
      ) => {
        return Promise.resolve(false)
      }
      $app.config.callbacks.onEventUpdate = vi.fn()

      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))
      document.dispatchEvent(new MouseEvent('mouseup'))

      const originalEvent = getEventWithId(eventId, $app)
      expect(originalEvent?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-23 03:30:00+00:00[UTC]'))
      expect(originalEvent?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-24 04:00:00+00:00[UTC]'))
      expect($app.config.callbacks.onEventUpdate).not.toHaveBeenCalled()
    })

    it('should update the event if the callback returns true', async () => {
      $app.config.callbacks.onBeforeEventUpdateAsync = async (
        _oldEvent,
        _newEvent,
        $app
      ) => {
        return Promise.resolve(true)
      }
      $app.config.callbacks.onEventUpdate = vi.fn()

      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))
      document.dispatchEvent(new MouseEvent('mouseup'))

      await waitFor(() => {
        expect(updateCopyFn).toHaveBeenCalled()
      })
    })
  })

  describe('dragging an event to the left when document direction is rtl', () => {
    it('should update the event to one day later', async () => {
      $app.config.direction = 'rtl'

      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-23 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-24 04:00:00+00:00[UTC]'))

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX - 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))

      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-24 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-25 04:00:00+00:00[UTC]'))
      expect(updateCopyFn).toHaveBeenCalled()

      document.dispatchEvent(new MouseEvent('mouseup'))

      await vi.runAllTimersAsync()

      await waitFor(() => {
        expect(getEventWithId(eventId, $app)?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-24 03:30:00+00:00[UTC]'))
        expect(getEventWithId(eventId, $app)?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-25 04:00:00+00:00[UTC]'))
        expect(updateCopyFn).toHaveBeenCalledTimes(2)
        expect(updateCopyFn).toHaveBeenCalledWith(undefined) // Test removing the event copy once the drag is done
      })
    })
  })

  describe('dragging an event to the right when document direction is rtl', () => {
    it('should update the event to one day earlier', async () => {
      $app.config.direction = 'rtl'
      new DateGridDragHandlerImpl(
        $app,
        eventCoordinates,
        eventCopy,
        updateCopyFn
      )

      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-23 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-24 04:00:00+00:00[UTC]'))

      const mouseMoveEvent = {
        clientX: eventCoordinates.clientX + 100,
        clientY: 1000,
      } as MouseEvent
      document.dispatchEvent(new MouseEvent('mousemove', mouseMoveEvent))

      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-22 03:30:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-23 04:00:00+00:00[UTC]'))
      expect(updateCopyFn).toHaveBeenCalled()

      document.dispatchEvent(new MouseEvent('mouseup'))

      await vi.runAllTimersAsync()

      await waitFor(() => {
        expect(getEventWithId(eventId, $app)?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-22 03:30:00+00:00[UTC]'))
        expect(getEventWithId(eventId, $app)?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-23 04:00:00+00:00[UTC]'))
        expect(updateCopyFn).toHaveBeenCalledTimes(2)
        expect(updateCopyFn).toHaveBeenCalledWith(undefined) // Test removing the event copy once the drag is done
      })
    })
  })
})
