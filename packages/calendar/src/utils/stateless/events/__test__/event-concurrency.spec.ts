/* eslint-disable max-lines */
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import CalendarConfigBuilder from '../../../stateful/config/calendar-config.builder'
import { handleEventConcurrency } from '../event-concurrency'

describe('Event concurrency', () => {
  const _config = new CalendarConfigBuilder().build()
  const createEvent = (event: { start: string; end: string; id: string }) => {
    return new CalendarEventBuilder(
      _config,
      event.id,
      event.start,
      event.end
    ).build()
  }

  describe('when concurrency occurs', () => {
    it('should have three concurrent events and one non-concurrent event', () => {
      const timeEvent1 = {
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:00',
        id: '1',
      }
      const timeEvent2 = {
        start: '2020-01-01 00:30',
        end: '2020-01-01 01:30',
        id: '2',
      }
      const timeEvent3 = {
        start: '2020-01-01 00:45',
        end: '2020-01-01 01:45',
        id: '3',
      }
      const timeEvent4 = {
        start: '2020-01-01 02:00',
        end: '2020-01-01 03:00',
        id: '4',
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
        id: '1',
      })
      const event2 = createEvent({
        start: '2020-01-01 01:00',
        end: '2020-01-01 02:00',
        id: '2',
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
        id: '1',
      })
      const event2 = createEvent({
        start: '2020-01-01 01:00',
        end: '2020-01-01 02:00',
        id: '2',
      })

      const result = handleEventConcurrency([event1, event2])

      expect(result[0]._totalConcurrentEvents).toBe(2)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[1]._totalConcurrentEvents).toBe(2)
      expect(result[1]._previousConcurrentEvents).toBe(1)
    })

    it('should have 5 concurrent events, but 2-5 should only have 1 or 2 previous concurrent event', () => {
      const longEvent = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 06:00',
        id: '1',
      })
      const event2 = createEvent({
        start: '2020-01-01 00:30',
        end: '2020-01-01 01:00',
        id: '2',
      })
      const event3 = createEvent({
        start: '2020-01-01 00:45',
        end: '2020-01-01 01:30',
        id: '3',
      })
      const event4 = createEvent({
        start: '2020-01-01 02:00',
        end: '2020-01-01 03:00',
        id: '4',
      })
      const event5 = createEvent({
        start: '2020-01-01 04:30',
        end: '2020-01-01 05:00',
        id: '5',
      })

      const result = handleEventConcurrency([
        longEvent,
        event2,
        event3,
        event4,
        event5,
      ])

      expect(result[0]._totalConcurrentEvents).toBe(5)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[1]._totalConcurrentEvents).toBe(5)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[2]._totalConcurrentEvents).toBe(5)
      expect(result[2]._previousConcurrentEvents).toBe(2)
      expect(result[3]._totalConcurrentEvents).toBe(5)
      expect(result[3]._previousConcurrentEvents).toBe(1)
      expect(result[4]._totalConcurrentEvents).toBe(5)
      expect(result[4]._previousConcurrentEvents).toBe(1)
    })

    it('should have 3 concurrent events where 1 and 2 start at the same time', () => {
      const event1 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:00',
        id: '1',
      })
      const event2 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:00',
        id: '2',
      })
      const event3 = createEvent({
        start: '2020-01-01 00:30',
        end: '2020-01-01 01:30',
        id: '3',
      })

      const result = handleEventConcurrency([event1, event2, event3])

      expect(result[0]._totalConcurrentEvents).toBe(3)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[1]._totalConcurrentEvents).toBe(3)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[2]._totalConcurrentEvents).toBe(3)
      expect(result[2]._previousConcurrentEvents).toBe(2)
    })

    it('should have 5 concurrent events where 1, 2, 3 start at the same time, 4 and 5 do not overlap', () => {
      const event1 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 05:00',
        id: '1',
      })
      const event2 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:00',
        id: '2',
      })
      const event3 = createEvent({
        start: '2020-01-01 00:00',
        end: '2020-01-01 01:00',
        id: '3',
      })
      const event4 = createEvent({
        start: '2020-01-01 02:00',
        end: '2020-01-01 03:00',
        id: '4',
      })
      const event5 = createEvent({
        start: '2020-01-01 04:00',
        end: '2020-01-01 05:00',
        id: '5',
      })

      const result = handleEventConcurrency([
        event1,
        event2,
        event3,
        event4,
        event5,
      ])

      expect(result[0]._totalConcurrentEvents).toBe(5)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[1]._totalConcurrentEvents).toBe(5)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[2]._totalConcurrentEvents).toBe(5)
      expect(result[2]._previousConcurrentEvents).toBe(2)
      expect(result[3]._totalConcurrentEvents).toBe(5)
      expect(result[3]._previousConcurrentEvents).toBe(1)
      expect(result[4]._totalConcurrentEvents).toBe(5)
      expect(result[4]._previousConcurrentEvents).toBe(1)
    })
  })
})
