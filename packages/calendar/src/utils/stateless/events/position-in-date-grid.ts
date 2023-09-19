import { CalendarEventInternal } from '../../stateful/calendar-event/calendar-event.interface'
import { WeekDayContexts } from '../../../types/week-day-context'
import { dateFromDateTime } from '../../../../../../shared/utils/stateless/time/format-conversion/string-to-string'

/**
 * Create a table-like representation of the week, where each cell can hold a full-day event or multiple-day-timed event.
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
    const eventStartDate = dateFromDateTime(event.time.start)
    const eventEndDate = dateFromDateTime(event.time.end)

    let isEventInWeek = !!weekDayContexts[eventStartDate]
    if (
      !isEventInWeek &&
      eventStartDate < firstDateOfWeek &&
      eventEndDate >= firstDateOfWeek
    ) {
      isEventInWeek = true
    }
    if (!isEventInWeek) continue

    const firstDateOfEvent = isEventInWeek ? eventStartDate : firstDateOfWeek
    let lastDateOfEvent = eventEndDate
    if (eventEndDate > lastDateOfWeek) lastDateOfEvent = lastDateOfWeek

    const eventDays = Object.values(weekDayContexts).filter(
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
      const isIndexFree = eventDays.every((weekDayContext) => {
        return !weekDayContext.dateGridEvents[testIndex]
      })
      if (isIndexFree) indexInWeekForEvent = testIndex
      else testIndex++
    }

    for (const [eventDayIndex, eventDay] of eventDays.entries()) {
      if (eventDayIndex === 0) {
        event._nDaysInGrid = eventDays.length
        eventDay.dateGridEvents[indexInWeekForEvent] = event
      } else {
        eventDay.dateGridEvents[indexInWeekForEvent] = 'blocker'
      }
    }
  }

  return weekDayContexts
}
