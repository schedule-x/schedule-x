import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import MonthGridDragHandlerImpl from '../../month-grid-drag-handler.impl'
import { getEventWithId } from '../time-grid-drag-handler/utils'
import { vi } from 'vitest'
import { waitFor } from '@testing-library/preact'
import 'temporal-polyfill/global'

describe('MonthGridDragHandler', () => {
  describe('Dragging an event forwards', () => {
    let $app: CalendarAppSingleton
    let calendarEvent: CalendarEventInternal

    beforeEach(() => {
      $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: Temporal.PlainDate.from('2021-01-01'),
            end: Temporal.PlainDate.from('2021-01-03'),
          },
          {
            id: '2',
            start: Temporal.PlainDate.from('2021-01-01'),
            end: Temporal.PlainDate.from('2021-01-01'),
          },
        ],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: 'month-grid',
      })
      $app.elements.calendarWrapper = document.createElement('div')
      calendarEvent = $app.calendarEvents.list.value[0]
    })

    it('should move the event to the next day', async () => {
      const fourthOfJanuaryElement = document.createElement('div')
      fourthOfJanuaryElement.classList.add('sx__month-grid-day')
      fourthOfJanuaryElement.dataset.date = '2021-01-04'
      $app.elements.calendarWrapper!.appendChild(fourthOfJanuaryElement)
      new MonthGridDragHandlerImpl(calendarEvent, $app)

      fourthOfJanuaryElement.dispatchEvent(new MouseEvent('dragover'))
      document.dispatchEvent(new MouseEvent('dragend'))

      await waitFor(() => {
        expect(calendarEvent.start).toEqual(
          Temporal.PlainDate.from('2021-01-04')
        )
        expect(calendarEvent.end).toEqual(Temporal.PlainDate.from('2021-01-06'))
      })
    })

    it('should set pointer events to none for other events while dragging, and then back to auto', () => {
      const fourthOfJanuaryElement = document.createElement('div')
      fourthOfJanuaryElement.classList.add('sx__month-grid-day')
      fourthOfJanuaryElement.dataset.date = '2021-01-04'
      const otherEvent = document.createElement('div')
      otherEvent.classList.add('sx__event')
      $app.elements.calendarWrapper!.appendChild(fourthOfJanuaryElement)
      $app.elements.calendarWrapper!.appendChild(otherEvent)
      new MonthGridDragHandlerImpl(calendarEvent, $app)

      fourthOfJanuaryElement.dispatchEvent(new MouseEvent('dragover'))
      expect(otherEvent.style.pointerEvents).toBe('none')

      document.dispatchEvent(new MouseEvent('dragend'))
      expect(otherEvent.style.pointerEvents).toBe('auto')
    })

    it('should add a class for the dragover day to signal it is active', () => {
      const fourthOfJanuaryElement = document.createElement('div')
      fourthOfJanuaryElement.classList.add('sx__month-grid-day')
      fourthOfJanuaryElement.dataset.date = '2021-01-04'
      const fifthOfJanuaryElement = document.createElement('div')
      fifthOfJanuaryElement.classList.add('sx__month-grid-day')
      fifthOfJanuaryElement.dataset.date = '2021-01-05'
      $app.elements.calendarWrapper!.appendChild(fourthOfJanuaryElement)
      $app.elements.calendarWrapper!.appendChild(fifthOfJanuaryElement)
      new MonthGridDragHandlerImpl(getEventWithId('2', $app)!, $app)

      fourthOfJanuaryElement.dispatchEvent(new MouseEvent('dragover'))
      expect(
        fourthOfJanuaryElement.classList.contains(
          'sx__month-grid-day--dragover'
        )
      ).toBe(true)
      expect(
        fifthOfJanuaryElement.classList.contains('sx__month-grid-day--dragover')
      ).toBe(false)

      fifthOfJanuaryElement.dispatchEvent(new MouseEvent('dragover'))
      expect(
        fourthOfJanuaryElement.classList.contains(
          'sx__month-grid-day--dragover'
        )
      ).toBe(false)
      expect(
        fifthOfJanuaryElement.classList.contains('sx__month-grid-day--dragover')
      ).toBe(true)
    })
  })

  describe('aborting the update through onBeforeEventUpdate', () => {
    it('should not update the event if onBeforeEventUpdate returns false', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: Temporal.PlainDate.from('2021-01-01'),
            end: Temporal.PlainDate.from('2021-01-03'),
          },
        ],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: 'month-grid',
      })
      $app.elements.calendarWrapper = document.createElement('div')
      const calendarEvent = $app.calendarEvents.list.value[0]
      const fourthOfJanuaryElement = document.createElement('div')
      fourthOfJanuaryElement.classList.add('sx__month-grid-day')
      fourthOfJanuaryElement.dataset.date = '2021-01-04'
      $app.elements.calendarWrapper!.appendChild(fourthOfJanuaryElement)
      new MonthGridDragHandlerImpl(calendarEvent, $app)

      $app.config.callbacks.onBeforeEventUpdate = () => false
      $app.config.callbacks.onEventUpdate = vi.fn()
      fourthOfJanuaryElement.dispatchEvent(new MouseEvent('dragover'))
      document.dispatchEvent(new MouseEvent('dragend'))

      expect(calendarEvent.start).toEqual(Temporal.PlainDate.from('2021-01-01'))
      expect(calendarEvent.end).toEqual(Temporal.PlainDate.from('2021-01-03'))
      expect($app.config.callbacks.onEventUpdate).not.toHaveBeenCalled()
    })

    it('should update the event if onBeforeEventUpdate returns true', async () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: Temporal.PlainDate.from('2021-01-01'),
            end: Temporal.PlainDate.from('2021-01-03'),
          },
        ],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: 'month-grid',
      })
      $app.elements.calendarWrapper = document.createElement('div')
      const calendarEvent = $app.calendarEvents.list.value[0]
      const fourthOfJanuaryElement = document.createElement('div')
      fourthOfJanuaryElement.classList.add('sx__month-grid-day')
      fourthOfJanuaryElement.dataset.date = '2021-01-04'
      $app.elements.calendarWrapper!.appendChild(fourthOfJanuaryElement)
      new MonthGridDragHandlerImpl(calendarEvent, $app)

      $app.config.callbacks.onBeforeEventUpdate = () => true
      $app.config.callbacks.onEventUpdate = vi.fn()
      fourthOfJanuaryElement.dispatchEvent(new MouseEvent('dragover'))
      document.dispatchEvent(new MouseEvent('dragend'))

      await waitFor(() => {
        expect(calendarEvent.start).toEqual(
          Temporal.PlainDate.from('2021-01-04')
        )
        expect(calendarEvent.end).toEqual(Temporal.PlainDate.from('2021-01-06'))
        expect($app.config.callbacks.onEventUpdate).toHaveBeenCalled()
      })
    })
  })
})
