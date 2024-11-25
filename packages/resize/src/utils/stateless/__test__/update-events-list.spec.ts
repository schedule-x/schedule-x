import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { updateEventsList } from '../update-events-list'
import { createEventRecurrencePlugin } from '@schedule-x/event-recurrence/src'
import { vi } from 'vitest'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'

describe('Updating the events list after resizing an event', () => {
  describe('When the event is not recurring', () => {
    it('should update the events list', () => {
      const originalEventEnd = '2021-01-01 01:00'
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2021-01-01 00:00',
            end: originalEventEnd,
          },
        ],
      })
      const eventCopy = deepCloneEvent($app.calendarEvents.list.value[0], $app)
      const newEventEnd = '2021-01-01 02:00'
      eventCopy.end = newEventEnd

      updateEventsList($app, eventCopy, originalEventEnd, newEventEnd)

      const externalEvent =
        $app.calendarEvents.list.value[0]._getExternalEvent()
      expect(externalEvent.start).toBe('2021-01-01 00:00')
      expect(externalEvent.end).toBe(newEventEnd)
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
      eventRecurrencePlugin.beforeRender!($app)
      const eventCopy = deepCloneEvent($app.calendarEvents.list.value[0], $app)

      updateEventsList($app, eventCopy, '2021-01-01 01:00', '2021-01-01 02:00')

      expect(updateOnResizeSpy).toHaveBeenCalledWith(
        '1',
        '2021-01-01 01:00',
        '2021-01-01 02:00'
      )
    })
  })
})
