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
import { dragEventNQuarters12HourGrid, getEventWithId } from './utils'

describe('A calendar with custom, non-hybrid day boundaries', () => {
  let $app: CalendarAppSingleton
  let clickEvent: MouseEvent
  let eventCopy: CalendarEventInternal
  let updateCopyFn: Mock
  let dayBoundariesDateTime: {
    start: string
    end: string
  }
  let eventId: string | number

  beforeEach(() => {
    $app = __createAppWithViews__({
      selectedDate: '2024-02-02',
      dayBoundaries: {
        start: '03:00',
        end: '15:00',
      },
    })
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      1,
      '2024-02-02 03:30',
      '2024-02-02 04:00'
    ).build()
    eventId = calendarEvent.id
    $app.calendarEvents.list.value = [calendarEvent]
    eventCopy = calendarEvent
    $app.elements.calendarWrapper = {
      querySelector: (selector: string) => {
        if (selector === '.sx__time-grid-day') {
          return {
            clientWidth: 100,
          } as HTMLDivElement
        }
      },
      querySelectorAll: (selector: string) => {
        if (selector === '.sx__time-grid-day') {
          // Mocking a NodeListOf<HTMLDivElement>
          const div = document.createElement('div')
          return {
            length: 1,
            item: (index: number) => (index === 0 ? div : null),
            forEach: () => {},
          } as NodeListOf<HTMLDivElement>
        }
        // Return an empty NodeList if the selector does not match
        return {
          length: 0,
          item: () => null,
          forEach: () => {},
        } as unknown as NodeListOf<HTMLDivElement>
      },
    } as HTMLDivElement

    clickEvent = {
      clientX: 1000,
      clientY: 1000,
    } as MouseEvent
    updateCopyFn = vi.fn()
    dayBoundariesDateTime = {
      start: '2024-02-02 03:00',
      end: '2024-02-02 15:00',
    }
  })

  describe('Dragging an event vertically in the time grid', () => {
    it('should not be able to drag and event beyond the start of a custom day', () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      /**
       * Drag event to 15:15
       * */
      dragEventNQuarters12HourGrid(clickEvent, 1, 'up')
      expect(eventCopy.start).toBe('2024-02-02 03:15')
      expect(eventCopy.end).toBe('2024-02-02 03:45')

      /**
       * Drag event to 15:00
       * */
      dragEventNQuarters12HourGrid(clickEvent, 2, 'up')
      expect(eventCopy.start).toBe('2024-02-02 03:00')
      expect(eventCopy.end).toBe('2024-02-02 03:30')

      /**
       * Try dragging event to 14:45 (which should do nothing)
       * */
      dragEventNQuarters12HourGrid(clickEvent, 3, 'up')
      expect(eventCopy.start).toBe('2024-02-02 03:00')
      expect(eventCopy.end).toBe('2024-02-02 03:30')

      document.dispatchEvent(new MouseEvent('mouseup'))
      expect(updateCopyFn).toHaveBeenCalled()
      expect(getEventWithId(eventId, $app)?.start).toEqual('2024-02-02 03:00')
      expect(getEventWithId(eventId, $app)?.end).toEqual('2024-02-02 03:30')
    })
  })
})
