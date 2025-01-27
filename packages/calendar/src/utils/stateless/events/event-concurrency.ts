import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

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
        concurrentEventsCache.every((e) => e.end < nextEvent.start))
    ) {
      concurrentEventsCache.push(event)

      for (let ii = 0; ii < concurrentEventsCache.length; ii++) {
        const currentEvent = concurrentEventsCache[ii]
        const NpreviousConcurrentEvents = concurrentEventsCache.filter(
          (cachedEvent, index) => {
            if (cachedEvent === currentEvent || index > ii) return false

            return (
              cachedEvent.start <= currentEvent.start &&
              cachedEvent.end > currentEvent.start
            )
          }
        ).length
        const NupcomingConcurrentEvents = concurrentEventsCache.filter(
          (cachedEvent, index) => {
            if (cachedEvent === currentEvent || index < ii) return false

            return (
              cachedEvent.start < currentEvent.end &&
              cachedEvent.end >= currentEvent.start
            )
          }
        ).length

        currentEvent._totalConcurrentEvents =
          NpreviousConcurrentEvents + NupcomingConcurrentEvents + 1
        currentEvent._previousConcurrentEvents = NpreviousConcurrentEvents

        // TODO v3: try to use _maxConcurrentEvents for both overlap/no overlap mode, and remove _totalConcurrentEvents
        let maxOverlappingEvents = 0
        const timePoints: { time: string; type: 'start' | 'end' }[] = []

        concurrentEventsCache.forEach((cachedEvent) => {
          if (
            cachedEvent.end > currentEvent.start &&
            cachedEvent.start < currentEvent.end
          ) {
            timePoints.push({ time: cachedEvent.start, type: 'start' })
            timePoints.push({ time: cachedEvent.end, type: 'end' })
          }
        })

        timePoints.sort(
          (a, b) => a.time.localeCompare(b.time) || (a.type === 'end' ? -1 : 1)
        )

        let currentOverlap = 0
        timePoints.forEach((point) => {
          if (point.type === 'start') {
            currentOverlap++
            maxOverlappingEvents = Math.max(
              maxOverlappingEvents,
              currentOverlap
            )
          } else {
            currentOverlap--
          }
        })

        currentEvent._maxConcurrentEvents = maxOverlappingEvents
      }
      concurrentEventsCache = []
      return handleEventConcurrency(sortedEvents, concurrentEventsCache, i + 1)
    }

    if (
      (nextEvent && event.end > nextEvent.start) ||
      concurrentEventsCache.some((e) => e.end > event.start)
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
