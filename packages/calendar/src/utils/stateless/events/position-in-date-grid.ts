import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { Week } from '../../../types/week'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { DATE_GRID_BLOCKER } from '../../../constants'

/**
 * Create a table-like representation of the week, where each cell can hold a full-day event or multiple-day-timed event.
 * If an event lasts more than one day, it creates blockers in the grid for its subsequent days, so that events don't collide.
 * For example:
 *
 * |  Mo    | Tue    |   We   |  Thu   |  Fri   | Sat    | Sun    |
 * | e1     | blocker| blocker| blocker| blocker| blocker| blocker|
 * |        |  e2    | blocker|        |  e4    |        |        |
 * |        |        |  e3    |        |        |        |        |
 * */
export const positionInDateGrid = (
  sortedDateGridEvents: CalendarEventInternal[],
  week: Week
) => {
  const weekDates = Object.keys(week).sort()
  const firstDateOfWeek = weekDates[0]
  const lastDateOfWeek = weekDates[weekDates.length - 1]
  const occupiedLevels = new Set<number>()

  for (const event of sortedDateGridEvents) {
    const eventOriginalStartDate = dateFromDateTime(event._startLocal)
    const eventOriginalEndDate = dateFromDateTime(event._endLocal)

    const isEventStartInWeek = !!week[eventOriginalStartDate]
    let isEventInWeek = isEventStartInWeek
    if (
      !isEventStartInWeek &&
      eventOriginalStartDate < firstDateOfWeek &&
      eventOriginalEndDate >= firstDateOfWeek
    ) {
      isEventInWeek = true
    }
    if (!isEventInWeek) continue

    const firstDateOfEvent = isEventStartInWeek
      ? eventOriginalStartDate
      : firstDateOfWeek
    const lastDateOfEvent =
      eventOriginalEndDate <= lastDateOfWeek
        ? eventOriginalEndDate
        : lastDateOfWeek

    const eventDays = Object.values(week).filter((day) => {
      return day.date >= firstDateOfEvent && day.date <= lastDateOfEvent
    })

    let levelInWeekForEvent
    let testLevel = 0

    while (levelInWeekForEvent === undefined) {
      const isLevelFree = eventDays.every((day) => {
        return !day.dateGridEvents[testLevel]
      })
      if (isLevelFree) {
        levelInWeekForEvent = testLevel
        occupiedLevels.add(testLevel)
      } else testLevel++
    }

    for (const [eventDayIndex, eventDay] of eventDays.entries()) {
      if (eventDayIndex === 0) {
        event._nDaysInGrid = eventDays.length
        eventDay.dateGridEvents[levelInWeekForEvent] = event
      } else {
        eventDay.dateGridEvents[levelInWeekForEvent] = DATE_GRID_BLOCKER
      }
    }
  }

  for (const level of Array.from(occupiedLevels)) {
    for (const [, day] of Object.entries(week)) {
      if (!day.dateGridEvents[level]) {
        day.dateGridEvents[level] = undefined
      }
    }
  }

  return week
}
