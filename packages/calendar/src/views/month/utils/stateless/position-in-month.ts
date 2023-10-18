import { Month as MonthType, MonthDay } from '../../types/month'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { DATE_GRID_BLOCKER } from '../../../../constants'

const positionInMonthWeek = (
  sortedEvents: CalendarEventInternal[],
  week: Record<string, MonthDay>
) => {
  const weekDates = Object.keys(week).sort()
  const firstDateOfWeek = weekDates[0]
  const lastDateOfWeek = weekDates[weekDates.length - 1]
  const occupiedLevels = new Set<number>()

  for (const event of sortedEvents) {
    const eventStartDate = dateFromDateTime(event.time.start)
    const eventEndDate = dateFromDateTime(event.time.end)

    const isEventStartInWeek = !!week[eventStartDate]
    let isEventInWeek = isEventStartInWeek
    if (
      !isEventStartInWeek &&
      eventStartDate < firstDateOfWeek &&
      eventEndDate >= firstDateOfWeek
    ) {
      isEventInWeek = true
    }
    if (!isEventInWeek) continue

    const firstDateOfEvent = isEventStartInWeek
      ? eventStartDate
      : firstDateOfWeek
    const lastDateOfEvent =
      eventEndDate <= lastDateOfWeek ? eventEndDate : lastDateOfWeek

    const eventDays = Object.values(week).filter((day) => {
      return day.date >= firstDateOfEvent && day.date <= lastDateOfEvent
    })

    let levelInWeekForEvent
    let testLevel = 0

    while (levelInWeekForEvent === undefined) {
      const isLevelFree = eventDays.every((day) => {
        return !day.events[testLevel]
      })
      if (isLevelFree) {
        levelInWeekForEvent = testLevel
        occupiedLevels.add(testLevel)
      } else testLevel++
    }

    for (const [eventDayIndex, eventDay] of eventDays.entries()) {
      if (eventDayIndex === 0) {
        event._eventFragments[firstDateOfEvent] = eventDays.length
        eventDay.events[levelInWeekForEvent] = event
      } else {
        eventDay.events[levelInWeekForEvent] = DATE_GRID_BLOCKER
      }
    }
  }

  for (const level of Array.from(occupiedLevels)) {
    for (const [, day] of Object.entries(week)) {
      if (!day.events[level]) {
        day.events[level] = undefined
      }
    }
  }

  return week
}

export const positionInMonth = (
  month: MonthType,
  sortedEvents: CalendarEventInternal[]
) => {
  const weeks: Record<string, MonthDay>[] = []
  month.forEach((week) => {
    const weekMap: Record<string, MonthDay> = {}
    week.forEach((day) => (weekMap[day.date] = day))
    weeks.push(weekMap)
  })
  weeks.forEach((week) => positionInMonthWeek(sortedEvents, week))

  return month
}
