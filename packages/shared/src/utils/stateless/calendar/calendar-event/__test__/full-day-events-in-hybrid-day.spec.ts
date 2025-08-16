import {
  describe,
  expect,
  it,
} from '../../../testing/unit/unit-testing-library.impl'
import CalendarConfigBuilder from '@schedule-x/calendar/src/utils/stateful/config/calendar-config.builder'
import CalendarEventBuilder from '../calendar-event.builder'
import 'temporal-polyfill/global'

describe('CalendarEventImpl', () => {
  describe('the event time type in a hybrid day', () => {
    const _config = new CalendarConfigBuilder()
      .withDayBoundaries({
        start: '23:00',
        end: '03:00',
      })
      .build()
    const createEvent = (eventTime: {
      start: Temporal.ZonedDateTime | Temporal.PlainDate
      end: Temporal.ZonedDateTime | Temporal.PlainDate
    }) =>
      new CalendarEventBuilder(
        _config,
        '1',
        eventTime.start,
        eventTime.end
      ).build()

    it('should be classified as a single full day event', () => {
      const eventTime = {
        start: Temporal.PlainDate.from('2020-01-01'),
        end: Temporal.PlainDate.from('2020-01-01'),
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
