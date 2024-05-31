import { Week } from '../../../../types/week'
import { sortEventsByStartAndEnd } from '../../events/sort-by-start-date'
import { handleEventConcurrency } from '../../events/event-concurrency'
import { CalendarEventInternal } from '@schedule-x/shared/src'

const resetEventConcurrencyProperties = (event: CalendarEventInternal) => {
  console.log('reset', event.id)
  event._previousConcurrentEvents = undefined
  event._totalConcurrentEvents = undefined
}

/**
 * Find out if any time grid event was added, removed or updated
 * if this is the case, replace the old time grid days with the new time grid days
 * */
export const replaceTimeGridDays = (oldWeek: Week, newWeek: Week) => {
  Object.entries(oldWeek).forEach(([date, oldDay]) => {
    const replaceDate = () => {
      console.log('replacing date', date)
      const newUnsortedEvents = newWeek[date].timeGridEvents
      newUnsortedEvents.forEach(resetEventConcurrencyProperties)
      newUnsortedEvents.sort(sortEventsByStartAndEnd)
      handleEventConcurrency(newUnsortedEvents)
      oldDay.version.value++
      oldWeek[date].timeGridEvents = newUnsortedEvents
      console.log(oldWeek[date].timeGridEvents)
    }

    const newDay = newWeek[date]
    if (!newDay) return

    const dayHasDifferentLength =
      oldDay.timeGridEvents.length !== newDay.timeGridEvents.length
    const someEventWasAdded = newDay.timeGridEvents.some(
      (event) => !oldDay.timeGridEvents.includes(event)
    )
    const someEventWasRemoved = oldDay.timeGridEvents.some(
      (event) => !newDay.timeGridEvents.includes(event)
    )

    if (dayHasDifferentLength || someEventWasAdded || someEventWasRemoved) {
      return replaceDate()
    }

    const someEventWasUpdated = newDay.timeGridEvents.some((newEvent) => {
      const oldEvent = oldDay.timeGridEvents.find(
        (oldEvent) => oldEvent.id === newEvent.id
      )

      return (
        JSON.stringify(oldEvent?._getExternalEvent()) !==
        JSON.stringify(newEvent._getExternalEvent())
      )
    })
    console.log('someEventWasUpdated', someEventWasUpdated)

    if (someEventWasUpdated) {
      return replaceDate()
    }
  })
}
