import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import MonthGridDragHandlerImpl from '../../month-grid-drag-handler.impl'
import { getEventWithId } from '../time-grid-drag-handler/utils'

describe('MonthGridDragHandler', () => {
  describe('Dragging an event forwards', () => {
    let $app: CalendarAppSingleton
    let calendarEvent: CalendarEventInternal

    beforeEach(() => {
      $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2021-01-01',
            end: '2021-01-03',
          },
          {
            id: '2',
            start: '2021-01-01',
            end: '2021-01-01',
          },
        ],
        selectedDate: '2021-01-01',
        defaultView: 'month-grid',
      })
      $app.elements.calendarWrapper = document.createElement('div')
      calendarEvent = $app.calendarEvents.list.value[0]
    })

    it('should move the event to the next day', () => {
      const fourthOfJanuaryElement = document.createElement('div')
      fourthOfJanuaryElement.classList.add('sx__month-grid-day')
      fourthOfJanuaryElement.dataset.date = '2021-01-04'
      $app.elements.calendarWrapper!.appendChild(fourthOfJanuaryElement)
      new MonthGridDragHandlerImpl(calendarEvent, $app)

      fourthOfJanuaryElement.dispatchEvent(new MouseEvent('dragover'))
      document.dispatchEvent(new MouseEvent('dragend'))

      expect(calendarEvent.start).toBe('2021-01-04')
      expect(calendarEvent.end).toBe('2021-01-06')
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
})
