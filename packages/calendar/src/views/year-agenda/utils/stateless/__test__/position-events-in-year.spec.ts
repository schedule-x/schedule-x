/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createAgendaYear } from '../create-agenda-year'
import CalendarEventBuilder from '../../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { __createAppWithViews__ } from '../../../../../utils/stateless/testing/__create-app-with-views__'
import { positionEventsInYear } from '../position-events-in-year'

describe('Positioning events for in month view', () => {
  const $app = __createAppWithViews__()

  describe('Positioning single day events in first week', () => {
    const month = createAgendaYear('2020-01-01')
    const event1 = new CalendarEventBuilder(
      $app.config,
      1,
      '2020-01-01',
      '2020-01-01'
    ).build()
    const event2 = new CalendarEventBuilder(
      $app.config,
      1,
      '2020-01-01',
      '2020-01-01'
    ).build()
    const sortedEvents = [event1, event2]

    it('should position two events on first two levels of 1st of January', () => {
      const result = positionEventsInYear(month, sortedEvents)
      expect(result[0].weeks[0][0].events[0]).toBe(event1)
      expect(result[0].weeks[0][0].events[1]).toBe(event2)
    })
  })

  // No multi days events in year overview mode
})
