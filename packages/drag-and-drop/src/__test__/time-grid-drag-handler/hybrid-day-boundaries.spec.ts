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
import { dragEventNQuartersIn20HourGridOf2000px } from './utils'
import 'temporal-polyfill/global'

describe('A calendar with custom hybrid day boundaries', () => {
  let $app: CalendarAppSingleton
  let clickEvent: MouseEvent
  let eventCopy: CalendarEventInternal
  let eventCopyElement: HTMLDivElement
  let updateCopyFn: Mock
  let dayBoundariesDateTime: {
    start: Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime
  }

  beforeEach(() => {
    $app = __createAppWithViews__({
      weekOptions: {
        gridHeight: 2000,
      },
      selectedDate: Temporal.PlainDate.from('2024-02-02'),
      dayBoundaries: {
        start: '06:00',
        end: '02:00',
      },
    })
    eventCopy = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.ZonedDateTime.from('2024-02-02 23:00+00:00[UTC]'),
      Temporal.ZonedDateTime.from('2024-02-02 23:30+00:00[UTC]')
    ).build()
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
      start: Temporal.ZonedDateTime.from('2024-02-02 06:00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2024-02-03 02:00+00:00[UTC]'),
    }
  })

  describe('Dragging an event vertically in the time grid', () => {
    it('should be able to drag an event beyond midnight', () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      /**
       * Drag event to end at 23:45
       * */
      dragEventNQuartersIn20HourGridOf2000px(clickEvent, 3, 'down')
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02 23:45+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-03 00:15+00:00[UTC]')
      )
    })

    it('should drag an event past midnight into next day, then backwards a day horizontally, and then backward vertically', () => {
      new TimeGridDragHandlerImpl(
        $app,
        clickEvent,
        eventCopy,
        updateCopyFn,
        dayBoundariesDateTime,
        25
      )

      /**
       * Drag event to end at 23:45
       * */
      const eventDraggedOnce = dragEventNQuartersIn20HourGridOf2000px(
        clickEvent,
        5,
        'down'
      )
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-03 00:15+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-03 00:45+00:00[UTC]')
      )

      /**
       * Drag event 1 day to the left
       * */
      const eventDraggedTwice = {
        ...eventDraggedOnce,
        clientX: eventDraggedOnce.clientX - 100,
      }
      document.dispatchEvent(new MouseEvent('mousemove', eventDraggedTwice))
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02 00:15+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-02 00:45+00:00[UTC]')
      )

      /**
       * Drag event 1 hour up
       * */
      dragEventNQuartersIn20HourGridOf2000px(
        eventDraggedTwice as MouseEvent,
        4,
        'up'
      )
      expect(eventCopy.start).toEqual(
        Temporal.ZonedDateTime.from('2024-02-01 23:15+00:00[UTC]')
      )
      expect(eventCopy.end).toEqual(
        Temporal.ZonedDateTime.from('2024-02-01 23:45+00:00[UTC]')
      )
    })
  })
})
