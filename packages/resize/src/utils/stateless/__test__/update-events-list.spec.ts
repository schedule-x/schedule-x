import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { updateEventsList } from '../update-events-list'
import { createEventRecurrencePlugin } from '@schedule-x/event-recurrence/src'
import { vi } from 'vitest'

describe('Updating the events list after resizing an event', () => {
  describe('When the event is not recurring', () => {
    it('should update the events list', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2021-01-01 00:00',
            end: '2021-01-01 01:00',
          },
        ],
      })
      const calendarEvent = $app.calendarEvents.list.value[0]

      updateEventsList(
        $app,
        calendarEvent,
        '2021-01-01 01:00',
        '2021-01-01 02:00'
      )

      const externalEvent =
        $app.calendarEvents.list.value[0]._getExternalEvent()
      expect(externalEvent.start).toBe('2021-01-01 00:00')
      expect(externalEvent.end).toBe('2021-01-01 02:00')
    })
  })

  describe('When the event is recurring', () => {
    it('should update the events list', () => {
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      const updateOnResizeSpy = vi.spyOn(
        eventRecurrencePlugin,
        'updateRecurrenceOnResize'
      )
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2021-01-01 00:00',
            end: '2021-01-01 01:00',
            rrule:
              'FREQ=DAILY;COUNT=3;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=20210104T000000Z',
          },
        ],
        plugins: [eventRecurrencePlugin],
      })
      eventRecurrencePlugin.init!($app)
      const calendarEvent = $app.calendarEvents.list.value[0]

      updateEventsList(
        $app,
        calendarEvent,
        '2021-01-01 01:00',
        '2021-01-01 02:00'
      )

      expect(updateOnResizeSpy).toHaveBeenCalledWith(
        '1',
        '2021-01-01 01:00',
        '2021-01-01 02:00'
      )
    })
  })
})
