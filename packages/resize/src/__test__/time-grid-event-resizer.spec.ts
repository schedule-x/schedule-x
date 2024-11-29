/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  describe,
  it,
  expect,
  beforeEach,
  spyOn,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { stubInterface } from 'ts-sinon'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarEventBuilder from '@schedule-x/shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { TimeGridEventResizer } from '../time-grid-event-resizer'
import CalendarEvents from '@schedule-x/shared/src/interfaces/calendar/calendar-events.interface'
import { signal } from '@preact/signals'
import { Mock, vi } from 'vitest'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { createResizePlugin } from '../resize.plugin'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'

describe('Resizing events in the time grid', () => {
  describe('When the calendar wrapper cannot be found', () => {
    it('should not throw an error', () => {
      const $app = stubInterface<CalendarAppSingleton>()
      const calendarEvent = new CalendarEventBuilder(
        $app.config,
        1,
        '2024-01-05 06:00',
        '2024-01-05 07:00'
      ).build()
      const eventUpdater = vi.fn()
      const initialY = 500

      const resizePlugin = createResizePlugin() as ResizePlugin
      resizePlugin.onRender!($app)
      resizePlugin.createTimeGridEventResizer(
        calendarEvent,
        eventUpdater,
        { clientY: initialY } as MouseEvent,
        {
          start: '2024-01-05 00:00',
          end: '2024-01-05 23:59',
        }
      )
    })
  })

  describe('When the calendar has regular day boundaries 0-24', () => {
    let $app: CalendarAppSingleton
    let calendarEvent: CalendarEventInternal
    let eventCopy: CalendarEventInternal
    let calendarEventNearEndOfDay: CalendarEventInternal
    let calendarWrapper: HTMLDivElement
    const initialY = 500
    let eventUpdater: Mock

    beforeEach(() => {
      calendarWrapper = document.createElement('div')
      $app = stubInterface<CalendarAppSingleton>()
      $app.elements = { calendarWrapper }
      $app.config = {
        ...stubInterface<CalendarConfigInternal>(),
        weekOptions: signal({
          gridHeight: 2400,
          nDays: 1,
          eventWidth: 100,
          timeAxisFormatOptions: { hour: 'numeric', minute: '2-digit' },
        }),
        timePointsPerDay: 2400,
      }
      calendarEvent = new CalendarEventBuilder(
        $app.config,
        1,
        '2024-01-05 06:00',
        '2024-01-05 07:00'
      ).build()
      eventCopy = deepCloneEvent(calendarEvent, $app)
      calendarEventNearEndOfDay = new CalendarEventBuilder(
        $app.config,
        2,
        '2024-01-05 23:00',
        '2024-01-05 23:30'
      ).build()
      $app.calendarEvents = stubInterface<CalendarEvents>()
      $app.calendarEvents.list = signal([
        calendarEvent,
        calendarEventNearEndOfDay,
      ])
      $app.config.callbacks = {
        onEventUpdate: vi.fn(),
      }
      eventUpdater = vi.fn()
    })

    it('should extend an event by 30 minutes', () => {
      const resizePlugin = createResizePlugin() as ResizePlugin
      resizePlugin.onRender!($app)
      resizePlugin.createTimeGridEventResizer(
        calendarEvent,
        eventUpdater,
        { clientY: initialY } as MouseEvent,
        {
          start: '2024-01-05 00:00',
          end: '2024-01-05 23:59',
        }
      )

      const updateEventSpy = spyOn($app.config.callbacks, 'onEventUpdate')

      // Drag 50 pixels down (half hour, because day = 2400px)
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 0, clientY: initialY + 50 })
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(calendarEvent.start).toBe('2024-01-05 06:00')
      expect(calendarEvent.end).toBe('2024-01-05 07:30')
      expect(updateEventSpy).toHaveBeenCalledWith({
        id: 1,
        start: '2024-01-05 06:00',
        end: '2024-01-05 07:30',
      })
    })

    it('should shorten an event by 30 minutes', () => {
      new TimeGridEventResizer($app, eventCopy, eventUpdater, initialY, 25, {
        start: '2024-01-05 00:00',
        end: '2024-01-05 23:59',
      })
      const updateEventSpy = spyOn($app.config.callbacks, 'onEventUpdate')

      // Drag 50 pixels up (half hour, because day = 2400px)
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 0, clientY: initialY - 50 })
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(calendarEvent.start).toBe('2024-01-05 06:00')
      expect(calendarEvent.end).toBe('2024-01-05 06:30')
      expect(updateEventSpy).toHaveBeenCalledWith({
        id: 1,
        start: '2024-01-05 06:00',
        end: '2024-01-05 06:30',
      })
    })

    it('should not resize above the event start', () => {
      new TimeGridEventResizer($app, eventCopy, eventUpdater, initialY, 25, {
        start: '2024-01-05 00:00',
        end: '2024-01-05 23:59',
      })
      const updateEventSpy = spyOn($app.config.callbacks, 'onEventUpdate')

      let currentY = initialY
      // drag 6 times 25px upwards to simulate 1 1/2 hours
      for (let i = 0; i < 6; i++) {
        currentY -= 25
        calendarWrapper.dispatchEvent(
          new MouseEvent('mousemove', { clientX: 0, clientY: currentY })
        )
      }
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(calendarEvent.start).toBe('2024-01-05 06:00')
      expect(calendarEvent.end).toBe('2024-01-05 06:15')
      expect(updateEventSpy).toHaveBeenCalledWith({
        id: 1,
        start: '2024-01-05 06:00',
        end: '2024-01-05 06:15',
      })
    })

    it('should not resize beyond the end of the day', () => {
      const copiedEventNearEndOfDay = deepCloneEvent(
        calendarEventNearEndOfDay,
        $app
      )
      new TimeGridEventResizer(
        $app,
        copiedEventNearEndOfDay,
        eventUpdater,
        initialY,
        25,
        {
          start: '2024-01-05 00:00',
          end: '2024-01-05 23:59',
        }
      )
      const updateEventSpy = spyOn($app.config.callbacks, 'onEventUpdate')

      let currentY = initialY
      // drag 6 times 25px downwards to simulate 1 1/2 hours
      for (let i = 0; i < 6; i++) {
        currentY += 25
        calendarWrapper.dispatchEvent(
          new MouseEvent('mousemove', { clientX: 0, clientY: currentY })
        )
      }

      // mouseup
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(calendarEventNearEndOfDay.start).toBe('2024-01-05 23:00')
      expect(calendarEventNearEndOfDay.end).toBe('2024-01-05 23:45')
      expect(updateEventSpy).toHaveBeenCalledWith({
        id: 2,
        start: '2024-01-05 23:00',
        end: '2024-01-05 23:45',
      })
    })

    it('should call onEventUpdate once on mouseup', () => {
      new TimeGridEventResizer($app, eventCopy, eventUpdater, initialY, 25, {
        start: '2024-01-05 00:00',
        end: '2024-01-05 23:59',
      })
      const updateEventSpy = spyOn($app.config.callbacks, 'onEventUpdate')

      // first do 3 mousemoves
      let currentY = initialY
      for (let i = 0; i < 3; i++) {
        currentY += 25
        calendarWrapper.dispatchEvent(
          new MouseEvent('mousemove', { clientX: 0, clientY: currentY })
        )
      }

      // then do a mouseup
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(updateEventSpy).toHaveBeenCalledTimes(1)
      expect(updateEventSpy).toHaveBeenCalledWith({
        id: 1,
        start: '2024-01-05 06:00',
        end: '2024-01-05 07:45',
      })
    })
  })

  describe('aborting an update via onBeforeEventUpdate', () => {
    let $app: CalendarAppSingleton
    let calendarEvent: CalendarEventInternal
    let eventCopy: CalendarEventInternal
    let calendarWrapper: HTMLDivElement
    const initialY = 500
    let eventUpdater: Mock

    beforeEach(() => {
      calendarWrapper = document.createElement('div')
      $app = stubInterface<CalendarAppSingleton>()
      $app.elements = { calendarWrapper }
      $app.config = {
        ...stubInterface<CalendarConfigInternal>(),
        weekOptions: signal({
          gridHeight: 2400,
          nDays: 1,
          dayBoundaries: { start: '00:00', end: '24:00' },
          eventWidth: 100,
          timeAxisFormatOptions: { hour: 'numeric', minute: '2-digit' },
        }),
        timePointsPerDay: 2400,
      }
      calendarEvent = new CalendarEventBuilder(
        $app.config,
        1,
        '2024-01-05 06:00',
        '2024-01-05 07:00'
      ).build()
      eventCopy = deepCloneEvent(calendarEvent, $app)

      $app.calendarEvents = stubInterface<CalendarEvents>()
      $app.calendarEvents.list = signal([calendarEvent])
      $app.config.callbacks = {
        onEventUpdate: vi.fn(),
      }
      eventUpdater = vi.fn()
    })

    it('should not update the event if the callback returns false', () => {
      $app.config.callbacks = {
        ...$app.config.callbacks,
        onBeforeEventUpdate(_oldEvent, _newEvent, _$app) {
          return false
        },
      }
      new TimeGridEventResizer($app, eventCopy, eventUpdater, initialY, 25, {
        start: '2024-01-05 00:00',
        end: '2024-01-05 23:59',
      })
      const updateEventSpy = spyOn($app.config.callbacks, 'onEventUpdate')

      // Drag 50 pixels down (half hour, because day = 2400px)
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 0, clientY: initialY + 50 })
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(updateEventSpy).not.toHaveBeenCalled()
      const eventInternal = $app.calendarEvents.list.value[0]
      expect(eventInternal.start).toBe('2024-01-05 06:00')
      expect(eventInternal.end).toBe('2024-01-05 07:00')
    })

    it('should update the event if the callback returns true', () => {
      $app.config.callbacks = {
        ...$app.config.callbacks,
        onBeforeEventUpdate(_oldEvent, _newEvent, _$app) {
          return true
        },
      }
      new TimeGridEventResizer($app, eventCopy, eventUpdater, initialY, 25, {
        start: '2024-01-05 00:00',
        end: '2024-01-05 23:59',
      })
      const updateEventSpy = spyOn($app.config.callbacks, 'onEventUpdate')

      // Drag 50 pixels down (half hour, because day = 2400px)
      calendarWrapper.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 0, clientY: initialY + 50 })
      )
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(updateEventSpy).toHaveBeenCalled()
      const eventInternal = $app.calendarEvents.list.value[0]
      expect(eventInternal.start).toBe('2024-01-05 06:00')
      expect(eventInternal.end).toBe('2024-01-05 07:30')
    })
  })
})
