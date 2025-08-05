import 'temporal-polyfill/global'
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
  const createEvent = (event: { start: Temporal.ZonedDateTime | Temporal.PlainDate; end: Temporal.ZonedDateTime | Temporal.PlainDate; id: string }) => {
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
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        id: '1',
      }
      const timeEvent2 = {
        start: Temporal.ZonedDateTime.from('2020-01-01T00:30:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:30:00.00+00:00[UTC]'),
        id: '2',
      }
      const timeEvent3 = {
        start: Temporal.ZonedDateTime.from('2020-01-01T00:45:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:45:00.00+00:00[UTC]'),
        id: '3',
      }
      const timeEvent4 = {
        start: Temporal.ZonedDateTime.from('2020-01-01T02:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T03:00:00.00+00:00[UTC]'),
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
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        id: '1',
      })
      const event2 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T02:00:00.00+00:00[UTC]'),
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
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:01:00.00+00:00[UTC]'),
        id: '1',
      })
      const event2 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T02:00:00.00+00:00[UTC]'),
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
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T06:00:00.00+00:00[UTC]'),
        id: '1',
      })
      const event2 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T00:30:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        id: '2',
      })
      const event3 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T00:45:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:30:00.00+00:00[UTC]'),
        id: '3',
      })
      const event4 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T02:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T03:00:00.00+00:00[UTC]'),
        id: '4',
      })
      const event5 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T04:30:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T05:00:00.00+00:00[UTC]'),
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
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        id: '1',
      })
      const event2 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        id: '2',
      })
      const event3 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T00:30:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:30:00.00+00:00[UTC]'),
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
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T05:00:00.00+00:00[UTC]'),
        id: '1',
      })
      const event2 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        id: '2',
      })
      const event3 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00.00+00:00[UTC]'),
        id: '3',
      })
      const event4 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T02:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T03:00:00.00+00:00[UTC]'),
        id: '4',
      })
      const event5 = createEvent({
        start: Temporal.ZonedDateTime.from('2020-01-01T04:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2020-01-01T05:00:00.00+00:00[UTC]'),
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
        start: Temporal.ZonedDateTime.from('2023-09-19T12:35:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-19T14:05:00.00+00:00[UTC]'),
        id: '9542abf8f334',
      })
      const event2 = createEvent({
        start: Temporal.ZonedDateTime.from('2023-09-19T13:50:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-19T14:50:00.00+00:00[UTC]'),
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
      start: Temporal.ZonedDateTime.from('2025-01-28T13:30:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T17:00:00.00+00:00[UTC]'),
      id: '1',
    }
    const timeEvent2 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T15:00:00.00+00:00[UTC]'),
      id: '2',
    }
    const timeEvent3 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T15:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T16:30:00.00+00:00[UTC]'),
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
      start: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T14:40:00.00+00:00[UTC]'),
      id: '1',
    }
    const timeEvent2 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T14:40:00.00+00:00[UTC]'),
      id: '2',
    }
    const timeEvent3 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T14:40:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T15:20:00.00+00:00[UTC]'),
      id: '3',
    }
    const timeEvent4 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T15:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T15:40:00.00+00:00[UTC]'),
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
      start: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      id: '1',
    }
    const timeEvent2 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      id: '2',
    }
    const timeEvent3 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      id: '3',
    }
    const timeEvent4 = {
      start: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-01-28T14:00:00.00+00:00[UTC]'),
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
