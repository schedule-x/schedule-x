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

describe('Resizing events in the date grid', () => {
  let $app: CalendarAppSingleton
  let calendarEvent: CalendarEventInternal
  let twoDayEvent: CalendarEventInternal

  beforeEach(() => {
    $app = __createAppWithViews__()
    calendarEvent = new CalendarEventBuilder(
      $app.config,
      1,
      '2024-01-26',
      '2024-01-26'
    ).build()
    twoDayEvent = new CalendarEventBuilder(
      $app.config,
      1,
      '2024-01-26',
      '2024-01-27'
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

    it('should not be able to resize beyond the start of the event', () => {
      new DateGridEventResizer($app, calendarEvent, 1000)
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 900,
        })
      )

      expect(calendarEvent.start).toBe('2024-01-26')
      expect(calendarEvent.end).toBe('2024-01-26')
    })
  })

  describe('Dragging the event to the left', () => {
    it('should be able to resize a two-day event into being a one-day event', () => {
      new DateGridEventResizer($app, twoDayEvent, 1000)
      ;($app.elements.calendarWrapper as HTMLDivElement).dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 900,
        })
      )

      expect(twoDayEvent.start).toBe('2024-01-26')
      expect(twoDayEvent.end).toBe('2024-01-26')
    })
  })
})
