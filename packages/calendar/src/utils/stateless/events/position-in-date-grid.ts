import { CalendarEventInternal } from '../../stateful/calendar-event/calendar-event.interface'
import { WeekDayContexts } from '../../../types/week-day-context'
import { addDays } from '../../../../../../shared/utils/stateless/time/date-time-mutation/adding'

/**
 * Create a table-like representation of the week, where each cell can hold a full day event.
 * Each event has the possibility to stretch out to cover multiple cells, if they are longer than a day.
 * */
export const positionInDateGrid = (
  sortedDateGridEvents: CalendarEventInternal[],
  weekDayContexts: WeekDayContexts
) => {
  const weekDates = Object.keys(weekDayContexts)
  const firstDateOfWeek = weekDates[0]
  const lastDateOfWeek = weekDates[weekDates.length - 1]

  for (const event of sortedDateGridEvents) {
    if (event._isMultiDayFullDay || event._isSingleDayFullDay) {
      let isEventInWeek = !!weekDayContexts[event.time.start]
      if (
        !isEventInWeek &&
        event.time.start < firstDateOfWeek &&
        event.time.end >= firstDateOfWeek
      ) {
        isEventInWeek = true
      }
      if (!isEventInWeek) continue

      const firstDateOfEvent = isEventInWeek
        ? event.time.start
        : firstDateOfWeek
      let lastDateOfEvent = event.time.end
      if (event.time.end > lastDateOfWeek) lastDateOfEvent = lastDateOfWeek

      const relevantDayContexts = Object.values(weekDayContexts).filter(
        (weekDayContext) => {
          return (
            weekDayContext.date >= firstDateOfEvent &&
            weekDayContext.date <= lastDateOfEvent
          )
        }
      )

      let indexInWeekForEvent
      let testIndex = 0

      while (indexInWeekForEvent === undefined) {
        const isIndexFree = relevantDayContexts.every((weekDayContext) => {
          return !weekDayContext.dateGridEvents[testIndex]
        })
        if (isIndexFree) indexInWeekForEvent = testIndex
        else testIndex++
      }

      for (const [
        relevantDayIndex,
        relevantDay,
      ] of relevantDayContexts.entries()) {
        if (relevantDayIndex === 0) {
          relevantDay.dateGridEvents[indexInWeekForEvent] = event
        } else {
          relevantDay.dateGridEvents[indexInWeekForEvent] = 'blocker'
        }
      }
    }
  }

  return weekDayContexts
}

// delete later
// Object.values(weekDayContexts).forEach((weekDayContext, index) => {
//   if (index === 0) {
//     weekDayContext.dateGridEvents.push(sortedDateGridEvents[0] || null)
//     weekDayContext.dateGridEvents.push(sortedDateGridEvents[0] || null)
//   }
//
//   if (index === 1) {
//     weekDayContext.dateGridEvents.push('blocker')
//     weekDayContext.dateGridEvents.push('blocker')
//   }
// })
