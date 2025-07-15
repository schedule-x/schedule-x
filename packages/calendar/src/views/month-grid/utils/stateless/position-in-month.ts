import { Month as MonthType, MonthDay } from '../../types/month'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { DATE_GRID_BLOCKER } from '../../../../constants'
import { Temporal } from 'temporal-polyfill'

const positionInMonthWeek = (
  sortedEvents: CalendarEventInternal[],
  week: Record<string, MonthDay>
) => {
  const weekDates = Object.keys(week).sort()
  const firstDateOfWeek = weekDates[0]
  const lastDateOfWeek = weekDates[weekDates.length - 1]
  const occupiedLevels = new Set<number>()

  for (const event of sortedEvents) {
    const eventOriginalStartDate = dateFromDateTime(event.start.toString())
    const eventOriginalEndDate = dateFromDateTime(event.end.toString())

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
      const plainDate = Temporal.PlainDate.from(day.date).toString()

      return plainDate >= firstDateOfEvent && plainDate <= lastDateOfEvent
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
    week.forEach((day) => {
      const plainDate = Temporal.PlainDate.from(day.date)
      weekMap[plainDate.toString()] = day
    })
    weeks.push(weekMap)
  })
  weeks.forEach((week) => positionInMonthWeek(sortedEvents, week))

  return month
}
