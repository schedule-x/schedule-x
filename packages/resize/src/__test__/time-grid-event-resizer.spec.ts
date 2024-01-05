import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { stubInterface } from 'ts-sinon'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarEventBuilder from '@schedule-x/shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { TimeGridEventResizer } from '../time-grid-event-resizer'

describe('Resizing events in the time grid', () => {
  describe('When the calendar has regular day boundaries 0-24', () => {
    let $app: CalendarAppSingleton
    let calendarEvent: CalendarEventInternal
    const initialY = 500

    beforeEach(() => {
      const calendarWrapper = document.createElement('div')
      $app = stubInterface<CalendarAppSingleton>()
      $app.elements = { calendarWrapper }
      $app.config = {
        ...stubInterface<CalendarConfigInternal>(),
        weekOptions: { gridHeight: 2400 },
      }
      calendarEvent = new CalendarEventBuilder(
        $app.config,
        1,
        '2024-01-05 06:00',
        '2024-01-05 07:00'
      ).build()
    })

    it('should extend an event by 30 minutes', () => {
      new TimeGridEventResizer($app, calendarEvent, initialY, 25)

      // Drag 50 pixels down (half hour, because day = 2400px)
      document.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 0, clientY: initialY + 50 })
      )

      expect(calendarEvent.start).toBe('2024-01-05 06:30')
    })
  })
})
