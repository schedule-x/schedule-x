import {
  describe,
  it,
  expect,
} from '../../../testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '../calendar-event.builder'
import CalendarConfigBuilder from '@schedule-x/calendar/src/utils/stateful/config/calendar-config.builder'

describe('CalendarEventImpl', () => {
  describe('the event time type in a day with default day boundaries', () => {
    const _config = new CalendarConfigBuilder().build()
    const createEvent = (eventTime: { start: string; end: string }) =>
      new CalendarEventBuilder(
        _config,
        '1',
        eventTime.start,
        eventTime.end
      ).build()

    it('should create a single-day timed event', () => {
      const eventTime = {
        start: '2020-01-01 01:00',
        end: '2020-01-01 02:00',
      }
      const calendarEvent = new CalendarEventBuilder(
        _config,
        '1',
        eventTime.start,
        eventTime.end
      ).build()

      expect(calendarEvent._isSingleDayTimed).toBe(true)
      expect(calendarEvent._isSingleDayFullDay).toBe(false)
      expect(calendarEvent._isMultiDayTimed).toBe(false)
      expect(calendarEvent._isMultiDayFullDay).toBe(false)
      expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
    })

    it('should create a single-day full-day event', () => {
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

    it('should create a multi-day timed event', () => {
      const eventTime = {
        start: '2020-01-01 01:00',
        end: '2020-01-02 02:00',
      }
      const calendarEvent = createEvent(eventTime)

      expect(calendarEvent._isSingleDayTimed).toBe(false)
      expect(calendarEvent._isSingleDayFullDay).toBe(false)
      expect(calendarEvent._isMultiDayTimed).toBe(true)
      expect(calendarEvent._isMultiDayFullDay).toBe(false)
      expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
    })

    it('should create a multi-day full-day event', () => {
      const eventTime = {
        start: '2020-01-01',
        end: '2020-01-02',
      }
      const calendarEvent = createEvent(eventTime)

      expect(calendarEvent._isSingleDayTimed).toBe(false)
      expect(calendarEvent._isSingleDayFullDay).toBe(false)
      expect(calendarEvent._isMultiDayTimed).toBe(false)
      expect(calendarEvent._isMultiDayFullDay).toBe(true)
      expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
      expect(calendarEvent._isSingleTime).toBe(false)
    })
  })
})
