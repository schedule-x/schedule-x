import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { areEvents0MinutesAndConcurrent } from './is-event-0-minutes'

export const handleEventConcurrency = (
  sortedEvents: CalendarEventInternal[],
  concurrentEventsCache: CalendarEventInternal[] = [],
  currentIndex = 0
): CalendarEventInternal[] => {
  for (let i = currentIndex; i < sortedEvents.length; i++) {
    const event = sortedEvents[i]
    const nextEvent: CalendarEventInternal | undefined = sortedEvents[i + 1]
    const areBothEventsZeroMinutes = areEvents0MinutesAndConcurrent(
      event,
      nextEvent
    )

    const everyConcurrentEventEndsBeforeNextEvent =
      nextEvent &&
      concurrentEventsCache.every(
        (e) =>
          (e.end as Temporal.ZonedDateTime).epochNanoseconds <=
          (nextEvent.start as Temporal.ZonedDateTime).epochNanoseconds
      )
    const currentEventOverlapsWithNextEvent =
      nextEvent &&
      (event.end as Temporal.ZonedDateTime).epochNanoseconds >
        (nextEvent.start as Temporal.ZonedDateTime).epochNanoseconds

    if (
      concurrentEventsCache.length &&
      (!nextEvent ||
        (everyConcurrentEventEndsBeforeNextEvent &&
          !currentEventOverlapsWithNextEvent &&
          !areBothEventsZeroMinutes))
    ) {
      concurrentEventsCache.push(event)

      let maxColumnInBatch = 0
      for (let ii = 0; ii < concurrentEventsCache.length; ii++) {
        const currentEvent = concurrentEventsCache[ii]
        // Greedy interval coloring: assign smallest column not taken by overlapping previous events
        const takenColumns = new Set<number>()
        for (let j = 0; j < ii; j++) {
          const cachedEvent = concurrentEventsCache[j]
          const overlaps =
            areEvents0MinutesAndConcurrent(cachedEvent, currentEvent) ||
            ((cachedEvent.start as Temporal.ZonedDateTime).epochNanoseconds <=
              (currentEvent.start as Temporal.ZonedDateTime).epochNanoseconds &&
              (cachedEvent.end as Temporal.ZonedDateTime).epochNanoseconds >
                (currentEvent.start as Temporal.ZonedDateTime).epochNanoseconds)
          if (overlaps && cachedEvent._previousConcurrentEvents !== undefined) {
            takenColumns.add(cachedEvent._previousConcurrentEvents)
          }
        }
        let column = 0
        while (takenColumns.has(column)) column++
        maxColumnInBatch = Math.max(maxColumnInBatch, column)
        const NpreviousConcurrentEvents = column
        const NupcomingConcurrentEvents = concurrentEventsCache.filter(
          (cachedEvent, index) => {
            if (cachedEvent === currentEvent || index < ii) return false
            if (areEvents0MinutesAndConcurrent(cachedEvent, currentEvent))
              return true

            return (
              (cachedEvent.start as Temporal.ZonedDateTime).epochNanoseconds <
                (currentEvent.end as Temporal.ZonedDateTime).epochNanoseconds &&
              (cachedEvent.end as Temporal.ZonedDateTime).epochNanoseconds >=
                (currentEvent.start as Temporal.ZonedDateTime).epochNanoseconds
            )
          }
        ).length

        currentEvent._totalConcurrentEvents =
          NpreviousConcurrentEvents + NupcomingConcurrentEvents + 1
        currentEvent._previousConcurrentEvents = NpreviousConcurrentEvents
      }

      for (const evt of concurrentEventsCache) {
        evt._maxConcurrentEvents = maxColumnInBatch + 1
      }
      concurrentEventsCache = []
      return handleEventConcurrency(sortedEvents, concurrentEventsCache, i + 1)
    }

    if (
      (nextEvent &&
        (event.end as Temporal.ZonedDateTime).epochNanoseconds >
          (nextEvent.start as Temporal.ZonedDateTime).epochNanoseconds) ||
      concurrentEventsCache.some(
        (e) =>
          (e.end as Temporal.ZonedDateTime).epochNanoseconds >
          (event.start as Temporal.ZonedDateTime).epochNanoseconds
      ) ||
      areBothEventsZeroMinutes
    ) {
      concurrentEventsCache.push(event)
      return handleEventConcurrency(sortedEvents, concurrentEventsCache, i + 1)
    }

    event._totalConcurrentEvents = 1
    event._previousConcurrentEvents = 0
    event._maxConcurrentEvents = 1
  }

  return sortedEvents
}
