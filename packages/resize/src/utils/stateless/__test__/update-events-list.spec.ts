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
import 'temporal-polyfill/global'

describe('Updating the events list after resizing an event', () => {
  describe('When the event is not recurring', () => {
    it('should update the events list', () => {
      const originalEventEnd = Temporal.ZonedDateTime.from(
        '2021-01-01T01:00:00[Europe/Stockholm]'
      )
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: Temporal.ZonedDateTime.from(
              '2021-01-01T00:00:00[Europe/Stockholm]'
            ),
            end: originalEventEnd,
          },
        ],
        timezone: 'Europe/Stockholm',
      })
      const eventCopy = deepCloneEvent($app.calendarEvents.list.value[0], $app)
      const newEventEnd = Temporal.ZonedDateTime.from(
        '2021-01-01T02:00:00[Europe/Stockholm]'
      )
      eventCopy.end = newEventEnd

      updateEventsList($app, eventCopy, originalEventEnd, newEventEnd)

      const externalEvent =
        $app.calendarEvents.list.value[0]._getExternalEvent()
      expect(externalEvent.start).toEqual(
        Temporal.ZonedDateTime.from('2021-01-01T00:00:00[Europe/Stockholm]')
      )
      expect(externalEvent.end).toEqual(newEventEnd)
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
            start: Temporal.ZonedDateTime.from(
              '2021-01-01T00:00:00[Europe/Stockholm]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2021-01-01T01:00:00[Europe/Stockholm]'
            ),
            rrule:
              'FREQ=DAILY;COUNT=3;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;UNTIL=20210104T000000Z',
          },
        ],
        plugins: [eventRecurrencePlugin],
        timezone: 'Europe/Stockholm',
      })
      eventRecurrencePlugin.beforeRender!($app)
      const eventCopy = deepCloneEvent($app.calendarEvents.list.value[0], $app)

      updateEventsList(
        $app,
        eventCopy,
        Temporal.ZonedDateTime.from('2021-01-01T01:00:00[Europe/Stockholm]'),
        Temporal.ZonedDateTime.from('2021-01-01T02:00:00[Europe/Stockholm]')
      )

      expect(updateOnResizeSpy).toHaveBeenCalledWith(
        '1',
        Temporal.ZonedDateTime.from('2021-01-01T01:00:00[Europe/Stockholm]'),
        Temporal.ZonedDateTime.from('2021-01-01T02:00:00[Europe/Stockholm]')
      )
    })
  })
})
