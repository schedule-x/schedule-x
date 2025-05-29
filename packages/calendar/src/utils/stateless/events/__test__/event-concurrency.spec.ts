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
      expect(result[0]._maxConcurrentEvents).toBe(3)
      expect(result[1]._totalConcurrentEvents).toBe(3)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[1]._maxConcurrentEvents).toBe(3)
      expect(result[2]._totalConcurrentEvents).toBe(3)
      expect(result[2]._previousConcurrentEvents).toBe(2)
      expect(result[2]._maxConcurrentEvents).toBe(3)
      expect(result[3]._totalConcurrentEvents).toBe(1)
      expect(result[3]._previousConcurrentEvents).toBe(0)
      expect(result[3]._maxConcurrentEvents).toBe(1)
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

      expect(result[0]._totalConcurrentEvents).toBe(1)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[0]._maxConcurrentEvents).toBe(1)
      expect(result[1]._totalConcurrentEvents).toBe(1)
      expect(result[1]._previousConcurrentEvents).toBe(0)
      expect(result[1]._maxConcurrentEvents).toBe(1)
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
      expect(result[0]._maxConcurrentEvents).toBe(2)
      expect(result[1]._totalConcurrentEvents).toBe(2)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[1]._maxConcurrentEvents).toBe(2)
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
      expect(result[0]._maxConcurrentEvents).toBe(3)
      expect(result[1]._totalConcurrentEvents).toBe(3)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[1]._maxConcurrentEvents).toBe(3)
      expect(result[2]._totalConcurrentEvents).toBe(3)
      expect(result[2]._previousConcurrentEvents).toBe(2)
      expect(result[2]._maxConcurrentEvents).toBe(3)
      expect(result[3]._totalConcurrentEvents).toBe(2)
      expect(result[3]._previousConcurrentEvents).toBe(1)
      expect(result[3]._maxConcurrentEvents).toBe(2)
      expect(result[4]._totalConcurrentEvents).toBe(2)
      expect(result[4]._previousConcurrentEvents).toBe(1)
      expect(result[4]._maxConcurrentEvents).toBe(2)
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
      expect(result[0]._maxConcurrentEvents).toBe(3)
      expect(result[1]._totalConcurrentEvents).toBe(3)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[1]._maxConcurrentEvents).toBe(3)
      expect(result[2]._totalConcurrentEvents).toBe(3)
      expect(result[2]._previousConcurrentEvents).toBe(2)
      expect(result[2]._maxConcurrentEvents).toBe(3)
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
      expect(result[0]._maxConcurrentEvents).toBe(3)
      expect(result[1]._totalConcurrentEvents).toBe(3)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[1]._maxConcurrentEvents).toBe(3)
      expect(result[2]._totalConcurrentEvents).toBe(3)
      expect(result[2]._previousConcurrentEvents).toBe(2)
      expect(result[2]._maxConcurrentEvents).toBe(3)
      expect(result[3]._totalConcurrentEvents).toBe(2)
      expect(result[3]._previousConcurrentEvents).toBe(1)
      expect(result[3]._maxConcurrentEvents).toBe(2)
      expect(result[4]._totalConcurrentEvents).toBe(2)
      expect(result[4]._previousConcurrentEvents).toBe(1)
      expect(result[4]._maxConcurrentEvents).toBe(2)
    })

    it('should have two concurrent events, where 2 starts after 1, and also ends after 1', () => {
      const event = createEvent({
        start: '2023-09-19 12:35',
        end: '2023-09-19 14:05',
        id: '9542abf8f334',
      })
      const event2 = createEvent({
        start: '2023-09-19 13:50',
        end: '2023-09-19 14:50',
        id: 'a87c5f6312e1',
      })

      const result = handleEventConcurrency([event, event2])

      expect(result[0]._totalConcurrentEvents).toBe(2)
      expect(result[0]._previousConcurrentEvents).toBe(0)
      expect(result[0]._maxConcurrentEvents).toBe(2)
      expect(result[1]._totalConcurrentEvents).toBe(2)
      expect(result[1]._previousConcurrentEvents).toBe(1)
      expect(result[1]._maxConcurrentEvents).toBe(2)
    })
  })

  it('should have 1 event with 2 other consecutive events happening alongside', () => {
    const timeEvent1 = {
      start: '2025-01-28 13:30',
      end: '2025-01-28 17:00',
      id: '1',
    }
    const timeEvent2 = {
      start: '2025-01-28 14:00',
      end: '2025-01-28 15:00',
      id: '2',
    }
    const timeEvent3 = {
      start: '2025-01-28 15:00',
      end: '2025-01-28 16:30',
      id: '3',
    }
    const event1 = createEvent(timeEvent1)
    const event2 = createEvent(timeEvent2)
    const event3 = createEvent(timeEvent3)

    const result = handleEventConcurrency([event1, event2, event3])

    expect(result[0]._totalConcurrentEvents).toBe(3)
    expect(result[0]._previousConcurrentEvents).toBe(0)
    expect(result[0]._maxConcurrentEvents).toBe(2)
    expect(result[1]._totalConcurrentEvents).toBe(2)
    expect(result[1]._previousConcurrentEvents).toBe(1)
    expect(result[1]._maxConcurrentEvents).toBe(2)
    expect(result[2]._totalConcurrentEvents).toBe(2)
    expect(result[2]._previousConcurrentEvents).toBe(1)
    expect(result[2]._maxConcurrentEvents).toBe(2)
  })

  it('should have 4 events, where only 2 are truly concurrent', () => {
    const timeEvent1 = {
      start: '2025-01-28 14:00',
      end: '2025-01-28 14:40',
      id: '1',
    }
    const timeEvent2 = {
      start: '2025-01-28 14:00',
      end: '2025-01-28 14:40',
      id: '2',
    }
    const timeEvent3 = {
      start: '2025-01-28 14:40',
      end: '2025-01-28 15:20',
      id: '3',
    }
    const timeEvent4 = {
      start: '2025-01-28 15:00',
      end: '2025-01-28 15:40',
      id: '4',
    }

    const event1 = createEvent(timeEvent1)
    const event2 = createEvent(timeEvent2)
    const event3 = createEvent(timeEvent3)
    const event4 = createEvent(timeEvent4)

    const result = handleEventConcurrency([event1, event2, event3, event4])

    expect(result[0]._totalConcurrentEvents).toBe(2)
    expect(result[0]._previousConcurrentEvents).toBe(0)
    expect(result[0]._maxConcurrentEvents).toBe(2)

    expect(result[1]._totalConcurrentEvents).toBe(2)
    expect(result[1]._previousConcurrentEvents).toBe(1)
    expect(result[1]._maxConcurrentEvents).toBe(2)

    expect(result[2]._totalConcurrentEvents).toBe(2)
    expect(result[2]._previousConcurrentEvents).toBe(0)
    expect(result[2]._maxConcurrentEvents).toBe(2)

    expect(result[3]._totalConcurrentEvents).toBe(2)
    expect(result[3]._previousConcurrentEvents).toBe(1)
    expect(result[3]._maxConcurrentEvents).toBe(2)
  })

  it('should have 4 events that are all 0 minutes long at the same time', () => {
    const timeEvent1 = {
      start: '2025-01-28 14:00',
      end: '2025-01-28 14:00',
      id: '1',
    }
    const timeEvent2 = {
      start: '2025-01-28 14:00',
      end: '2025-01-28 14:00',
      id: '2',
    }
    const timeEvent3 = {
      start: '2025-01-28 14:00',
      end: '2025-01-28 14:00',
      id: '3',
    }
    const timeEvent4 = {
      start: '2025-01-28 14:00',
      end: '2025-01-28 14:00',
      id: '4',
    }
    const event1 = createEvent(timeEvent1)
    const event2 = createEvent(timeEvent2)
    const event3 = createEvent(timeEvent3)
    const event4 = createEvent(timeEvent4)

    const result = handleEventConcurrency([event1, event2, event3, event4])

    // they should be concurrent
    expect(result[0]._totalConcurrentEvents).toBe(4)
    expect(result[0]._previousConcurrentEvents).toBe(0)
    expect(result[1]._totalConcurrentEvents).toBe(4)
    expect(result[1]._previousConcurrentEvents).toBe(1)
    expect(result[2]._totalConcurrentEvents).toBe(4)
    expect(result[2]._previousConcurrentEvents).toBe(2)
    expect(result[3]._totalConcurrentEvents).toBe(4)
    expect(result[3]._previousConcurrentEvents).toBe(3)
  })
})
