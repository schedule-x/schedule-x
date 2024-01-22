import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { RRValues } from '../utils/stateful/recurrence-set-builder'
import { createEventRecurrencePlugin } from '../event-recurrence.plugin'

describe('Accessing the events facade through the event recurrence plugin', () => {
  describe('getAll()', () => {
    it('should only return the original event', () => {
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            title: 'test',
            start: '2020-01-15',
            end: '2020-01-15',
            rrule: {
              freq: RRValues.DAILY,
              count: 3,
            },
          },
        ],
        plugins: [eventRecurrencePlugin],
      })
      eventRecurrencePlugin.init($app)
      const eventsFacade = eventRecurrencePlugin.getEventsFacade()

      const events = eventsFacade.getAll()
      expect(events).length(1)
    })
  })

  describe('remove()', () => {
    it('should remove the original event and all its recurrence copies', () => {
      const eventRecurrencePlugin = createEventRecurrencePlugin()
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            title: 'test',
            start: '2020-01-15',
            end: '2020-01-15',
            rrule: {
              freq: RRValues.DAILY,
              count: 3,
            },
          },
        ],
        plugins: [eventRecurrencePlugin],
      })
      eventRecurrencePlugin.init($app)
      expect($app.calendarEvents.list.value).toHaveLength(3)
      const eventsFacade = eventRecurrencePlugin.getEventsFacade()

      eventsFacade.remove('1')
      const events = eventsFacade.getAll()
      expect(events).length(0)
      expect($app.calendarEvents.list.value).toHaveLength(0)
    })
  })
})
