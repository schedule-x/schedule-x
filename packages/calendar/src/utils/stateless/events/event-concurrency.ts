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

    if (
      concurrentEventsCache.length &&
      (!nextEvent ||
        (concurrentEventsCache.every((e) => e.end.toString() <= nextEvent.start.toString()) &&
          !areBothEventsZeroMinutes))
    ) {
      concurrentEventsCache.push(event)

      for (let ii = 0; ii < concurrentEventsCache.length; ii++) {
        const currentEvent = concurrentEventsCache[ii]
        const NpreviousConcurrentEvents = concurrentEventsCache.filter(
          (cachedEvent, index) => {
            if (cachedEvent === currentEvent || index > ii) return false
            if (areEvents0MinutesAndConcurrent(cachedEvent, currentEvent))
              return true

            return (
              cachedEvent.start.toString() <= currentEvent.start.toString() &&
              cachedEvent.end.toString() > currentEvent.start.toString()
            )
          }
        ).length
        const NupcomingConcurrentEvents = concurrentEventsCache.filter(
          (cachedEvent, index) => {
            if (cachedEvent === currentEvent || index < ii) return false
            if (areEvents0MinutesAndConcurrent(cachedEvent, currentEvent))
              return true

            return (
              cachedEvent.start.toString() < currentEvent.end.toString() &&
              cachedEvent.end.toString() >= currentEvent.start.toString()
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
            (cachedEvent.end.toString() > currentEvent.start.toString() &&
              cachedEvent.start.toString() < currentEvent.end.toString()) ||
            areEvents0MinutesAndConcurrent(cachedEvent, currentEvent)
          ) {
            timePoints.push({ time: cachedEvent.start.toString(), type: 'start' })
            timePoints.push({ time: cachedEvent.end.toString(), type: 'end' })
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
      (nextEvent && event.end.toString() > nextEvent.start.toString()) ||
      concurrentEventsCache.some((e) => e.end.toString() > event.start.toString()) ||
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
