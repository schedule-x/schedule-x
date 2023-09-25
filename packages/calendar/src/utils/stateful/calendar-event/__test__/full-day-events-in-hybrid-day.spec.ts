import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarConfigBuilder from '../../config/calendar-config.builder'
import { CalendarEventTime } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import CalendarEventBuilder from '../calendar-event.builder'

describe('CalendarEventImpl', () => {
  describe('the event time type in a hybrid day', () => {
    const _config = new CalendarConfigBuilder()
      .withDayBoundaries({
        start: '23:00',
        end: '03:00',
      })
      .build()
    const createEvent = (eventTime: CalendarEventTime) =>
      new CalendarEventBuilder(_config, '1', eventTime).build()

    it('should be classified as a single full day event', () => {
      const eventTime = {
        start: '2020-01-01',
        end: '2020-01-01',
      }
      const calendarEvent = createEvent(eventTime)

      expect(calendarEvent._isSingleDayTimed).toBe(false)
      expect(calendarEvent._isSingleDayFullDay).toBe(true)
      expect(calendarEvent._isMultiDayTimed).toBe(false)
      expect(calendarEvent._isMultiDayFullDay).toBe(false)
      expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
    })
  })
})
