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
import { sortEventsByStartAndEnd } from '../sort-by-start-date'

describe('Event concurrency', () => {
  const _config = new CalendarConfigBuilder().build()
  const createEvent = (event: {
    start: Temporal.ZonedDateTime | Temporal.PlainDate
    end: Temporal.ZonedDateTime | Temporal.PlainDate
    id: string
  }) => {
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

  it('should correctly handle a middle event that overlaps with both the first and third events', () => {
    // This test case documents the bug fix where Event 3 was being hidden behind Event 2
    // Event 1: 09:00-10:00
    // Event 2: 10:00-11:00 (touches Event 1 at boundary)
    // Event 3: 09:15-10:30 (overlaps with both Event 1 and Event 2)
    //
    // The bug: When processing Event 3, the algorithm would check if all cached events
    // (Event 1) ended before Event 2 starts. Since Event 1 ends at 10:00 and Event 2
    // starts at 10:00, it would finish processing the cache before Event 2, even though
    // Event 3 overlaps with Event 2.
    //
    // The fix: Added a check to prevent cache processing from finishing when the current
    // event overlaps with the next event. This ensures Event 3 is correctly grouped with
    // Event 2, preventing it from being hidden.
    const event1 = createEvent({
      start: Temporal.ZonedDateTime.from('2025-10-20T09:00:00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-10-20T10:00:00+00:00[UTC]'),
      id: '1',
    })
    const event2 = createEvent({
      start: Temporal.ZonedDateTime.from('2025-10-20T10:00:00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-10-20T11:00:00+00:00[UTC]'),
      id: '2',
    })
    const event3 = createEvent({
      start: Temporal.ZonedDateTime.from('2025-10-20T09:15:00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2025-10-20T10:30:00+00:00[UTC]'),
      id: '3',
    })

    // Events must be sorted by start time before passing to handleEventConcurrency
    const sortedEvents = [event1, event2, event3].sort(sortEventsByStartAndEnd)
    const result = handleEventConcurrency(sortedEvents)

    // After sorting by start time, order is: event1 (09:00), event3 (09:15), event2 (10:00)
    const event1Result = result.find((e) => e.id === '1')
    const event2Result = result.find((e) => e.id === '2')
    const event3Result = result.find((e) => e.id === '3')

    // This test documents the scenario that the fix addresses.
    // The fix prevents the concurrent events cache from being closed prematurely
    // when the current event overlaps with the next event.
    //
    // Without the fix: When processing Event 3, the algorithm would see that
    // Event 1 (in cache) ends at 10:00 and Event 2 (next) starts at 10:00,
    // and would finish processing the cache before adding Event 2, even though
    // Event 3 overlaps with Event 2. This would cause Event 3 to be hidden.
    //
    // With the fix: The algorithm checks if Event 3 overlaps with Event 2 before
    // deciding to finish processing the cache, ensuring Event 3 is correctly
    // grouped with Event 2.
    //
    // Note: The exact concurrency values may vary, but the important thing is
    // that Event 3 is not isolated and is correctly positioned relative to Event 2.
    expect(event1Result).toBeDefined()
    expect(event2Result).toBeDefined()
    expect(event3Result).toBeDefined()

    // Verify that Event 3 overlaps with Event 2 (they should be concurrent)
    // Event 3: 09:15-10:30, Event 2: 10:00-11:00
    // They overlap from 10:00-10:30, so they should be in the same concurrent group
    const event3End = (event3Result?.end as Temporal.ZonedDateTime)
      .epochNanoseconds
    const event2Start = (event2Result?.start as Temporal.ZonedDateTime)
      .epochNanoseconds
    expect(event3End).toBeGreaterThan(event2Start) // Event 3 ends after Event 2 starts = they overlap

    // Now that events are properly sorted, verify the concurrency values
    // Event 1 overlaps with Event 3, Event 3 overlaps with Event 2
    // Event 1 and Event 2 only touch at boundary (10:00), so they're not directly concurrent
    expect(event1Result?._totalConcurrentEvents).toBe(2) // Event 1 is concurrent with Event 3
    expect(event1Result?._previousConcurrentEvents).toBe(0)
    expect(event1Result?._maxConcurrentEvents).toBe(2) // Max 2 events overlap (Event 1+3)
    expect(event3Result?._totalConcurrentEvents).toBe(3) // Event 3 is concurrent with both Event 1 and Event 2
    expect(event3Result?._previousConcurrentEvents).toBe(1) // Event 1 is before Event 3
    expect(event3Result?._maxConcurrentEvents).toBe(2) // Max 2 events overlap at any point (Event 1+3, then Event 3+2)
    expect(event2Result?._totalConcurrentEvents).toBe(2) // Event 2 is concurrent with Event 3
    expect(event2Result?._previousConcurrentEvents).toBe(1) // Event 3 is before Event 2
    expect(event2Result?._maxConcurrentEvents).toBe(2) // Max 2 events overlap (Event 3+2)
  })
})
