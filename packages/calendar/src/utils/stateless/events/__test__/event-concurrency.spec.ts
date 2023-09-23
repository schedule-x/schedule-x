import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '../../../stateful/calendar-event/calendar-event.builder'
import CalendarConfigBuilder from '../../../stateful/config/calendar-config.builder'
import { CalendarEventTime } from '../../../stateful/calendar-event/calendar-event.interface'
import { handleEventConcurrency } from '../event-concurrency'

describe('Event concurrency', () => {
  const _config = new CalendarConfigBuilder().build()
  const createEvent = (time: CalendarEventTime) => {
    return new CalendarEventBuilder(_config, '1', time).build()
  }

  describe('when concurrency occurs', () => {
    it('should have three concurrent events and one non-concurrent event', () => {
      const timeEvent1 = {
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:00',
      }
      const timeEvent2 = {
        start: '2020-01-01 00:30',
        end: '2020-01-01 01:30',
      }
      const timeEvent3 = {
        start: '2020-01-01 00:45',
        end: '2020-01-01 01:45',
      }
      const timeEvent4 = {
        start: '2020-01-01 02:00',
        end: '2020-01-01 03:00',
      }
      const event1 = createEvent(timeEvent1)
      const event2 = createEvent(timeEvent2)
      const event3 = createEvent(timeEvent3)
      const event4 = createEvent(timeEvent4)

      const result = handleEventConcurrency([event1, event2, event3, event4])

      expect(result[0]._totalConcurrentEvents).toBe(3)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[1]._totalConcurrentEvents).toBe(3)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[2]._totalConcurrentEvents).toBe(3)
      expect(result[2]._previousConcurrentEvents).toBe(2)

      expect(result[3]._totalConcurrentEvents).toBe(undefined)
      expect(result[3]._previousConcurrentEvents).toBe(undefined)
    })

    it('should not be concurrent, if event1 ends at the same time event2 starts', () => {
      const event1 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:00',
      })
      const event2 = createEvent({
        start: '2020-01-01 01:00',
        end: '2020-01-01 02:00',
      })

      const result = handleEventConcurrency([event1, event2])

      expect(result[0]._totalConcurrentEvents).toBe(undefined)
      expect(result[0]._previousConcurrentEvents).toBe(undefined)
      expect(result[1]._totalConcurrentEvents).toBe(undefined)
      expect(result[1]._previousConcurrentEvents).toBe(undefined)
    })

    it('should be concurrent, if event1 overlaps event2 by 1 minute', () => {
      const event1 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:01',
      })
      const event2 = createEvent({
        start: '2020-01-01 01:00',
        end: '2020-01-01 02:00',
      })

      const result = handleEventConcurrency([event1, event2])

      expect(result[0]._totalConcurrentEvents).toBe(2)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[1]._totalConcurrentEvents).toBe(2)
      expect(result[1]._previousConcurrentEvents).toBe(1)
    })
  })
})
