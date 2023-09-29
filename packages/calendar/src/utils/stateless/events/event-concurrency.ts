import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'

export const handleEventConcurrency = (
  sortedEvents: CalendarEventInternal[],
  concurrentEventsCache: CalendarEventInternal[] = [],
  currentIndex = 0
): CalendarEventInternal[] => {
  for (let i = currentIndex; i < sortedEvents.length; i++) {
    const event = sortedEvents[i]
    const nextEvent = sortedEvents[i + 1]

    if (
      concurrentEventsCache.length &&
      (!nextEvent ||
        concurrentEventsCache.every((e) => e.time.end < nextEvent.time.start))
    ) {
      concurrentEventsCache.push(event)

      for (let ii = 0; ii < concurrentEventsCache.length; ii++) {
        concurrentEventsCache[ii]._totalConcurrentEvents =
          concurrentEventsCache.length
        concurrentEventsCache[ii]._previousConcurrentEvents = ii
      }
      concurrentEventsCache = []
      return handleEventConcurrency(sortedEvents, concurrentEventsCache, i + 1)
    }

    if (
      (nextEvent && event.time.end > nextEvent.time.start) ||
      concurrentEventsCache.some((e) => e.time.end > event.time.start)
    ) {
      concurrentEventsCache.push(event)
      return handleEventConcurrency(sortedEvents, concurrentEventsCache, i + 1)
    }
  }

  return sortedEvents
}
