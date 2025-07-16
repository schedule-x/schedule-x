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
import { Temporal } from 'temporal-polyfill'

describe('A calendar with custom, non-hybrid day boundaries', () => {
  let $app: CalendarAppSingleton
  let clickEvent: MouseEvent
  let eventCopy: CalendarEventInternal
  let updateCopyFn: Mock
  let dayBoundariesDateTime: {
    start: Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime
  }
  let eventId: string | number

  beforeEach(() => {
    $app = __createAppWithViews__({
      selectedDate: Temporal.PlainDate.from('2024-02-02'),
      dayBoundaries: {
        start: '03:00',
        end: '15:00',
      },
    })
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.ZonedDateTime.from('2024-02-02 03:30+00:00[UTC]'),
      Temporal.ZonedDateTime.from('2024-02-02 04:00+00:00[UTC]')
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
    } as HTMLDivElement
    clickEvent = {
      clientX: 1000,
      clientY: 1000,
    } as MouseEvent
    updateCopyFn = vi.fn()
    dayBoundariesDateTime = {
      start: Temporal.ZonedDateTime.from('2024-02-02 03:00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2024-02-02 15:00+00:00[UTC]'),
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
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:15+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:45+00:00[UTC]'))

      /**
       * Drag event to 15:00
       * */
      dragEventNQuarters12HourGrid(clickEvent, 2, 'up')
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:30+00:00[UTC]'))

      /**
       * Try dragging event to 14:45 (which should do nothing)
       * */
      dragEventNQuarters12HourGrid(clickEvent, 3, 'up')
      expect(eventCopy.start).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:00+00:00[UTC]'))
      expect(eventCopy.end).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:30+00:00[UTC]'))

      document.dispatchEvent(new MouseEvent('mouseup'))
      expect(updateCopyFn).toHaveBeenCalled()
      expect(getEventWithId(eventId, $app)?.start).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:00+00:00[UTC]'))
      expect(getEventWithId(eventId, $app)?.end).toEqual(Temporal.ZonedDateTime.from('2024-02-02 03:30+00:00[UTC]'))
    })
  })
})
