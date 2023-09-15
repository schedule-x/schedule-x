import { CalendarEventInternal } from '../../stateful/calendar-event/calendar-event.interface'

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
      (!nextEvent || nextEvent.time.start >= event.time.end)
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

    if (!nextEvent || nextEvent.time.start > event.time.end) continue

    if (event.time.end > nextEvent.time.start) {
      concurrentEventsCache.push(event)
      return handleEventConcurrency(sortedEvents, concurrentEventsCache, i + 1)
    }
  }

  return sortedEvents
}
