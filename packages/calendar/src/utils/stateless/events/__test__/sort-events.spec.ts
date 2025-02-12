import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import CalendarConfigBuilder from '../../../stateful/config/calendar-config.builder'
import {
  sortEventsByStartAndEnd,
  sortEventsForMonthGrid,
} from '../sort-by-start-date'

describe('sorting events', () => {
  const config = new CalendarConfigBuilder().build()
  const createEvent = (time: { start: string; end: string }) => {
    return new CalendarEventBuilder(config, '1', time.start, time.end).build()
  }

  describe('sorting events based on date and time', () => {
    it('should sort events according to time in ascending order', () => {
      const eventExpected1 = createEvent({
        start: '2020-06-27 00:00',
        end: '2020-06-27 01:00',
      })
      const eventExpected2 = createEvent({
        start: '2020-06-27 01:00',
        end: '2020-06-27 02:00',
      })
      const eventExpected3 = createEvent({
        start: '2020-06-27 02:00',
        end: '2020-06-27 03:00',
      })
      const eventExpected4 = createEvent({
        start: '2020-06-28 03:00',
        end: '2020-06-28 04:00',
      })

      const result = [
        eventExpected3,
        eventExpected1,
        eventExpected2,
        eventExpected4,
      ].sort(sortEventsByStartAndEnd)

      expect(result[0]).toBe(eventExpected1)
      expect(result[1]).toBe(eventExpected2)
      expect(result[2]).toBe(eventExpected3)
      expect(result[3]).toBe(eventExpected4)
    })
  })

  describe('sorting events for the month grid', () => {
    it('should sort events according to date in ascending order', () => {
      const event1 = createEvent({
        start: '2020-01-01 01:00',
        end: '2020-01-31 01:00',
      })
      const event2 = createEvent({
        start: '2020-01-01 01:00',
        end: '2020-01-31 01:00',
      })
      // should be the last event, even though it starts earlier than the other events, see: https://github.com/schedule-x/schedule-x/issues/559
      const event3 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-10 01:00',
      })

      const result = [event2, event3, event1].sort(sortEventsForMonthGrid)

      expect(result[0]).toStrictEqual(event1)
      expect(result[1]).toStrictEqual(event2)
      expect(result[2]).toStrictEqual(event3)
    })

    it('should sort events that start and end at the same day by their start time', () => {
      const event1 = createEvent({
        start: '2020-01-01 01:00',
        end: '2020-01-01 02:00',
      })

      // should be the third event, because it starts later than event1, and ends earlier than event3
      const event2 = createEvent({
        start: '2020-01-01 02:00',
        end: '2020-01-01 03:00',
      })

      // should be the first event, because it ends on a later day than other events
      const event3 = createEvent({
        start: '2020-01-01 03:00',
        end: '2020-01-03 04:00',
      })

      const result = [event2, event3, event1].sort(sortEventsForMonthGrid)

      expect(result[0]).toStrictEqual(event3)
      expect(result[1]).toStrictEqual(event1)
      expect(result[2]).toStrictEqual(event2)
    })
  })
})
