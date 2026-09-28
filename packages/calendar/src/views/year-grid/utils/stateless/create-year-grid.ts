import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { YearGrid, YearGridDay } from '../../types/year-grid'

export const createYearGrid = (
  year: number,
  firstDayOfWeek: WeekDay
): YearGrid => {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    const date = Temporal.PlainDate.from({
      year,
      month: monthIndex + 1,
      day: 1,
    })
    const leadingDays = (date.dayOfWeek - firstDayOfWeek + 7) % 7
    const days: YearGridDay[] = Array.from(
      { length: date.daysInMonth },
      (_, dayIndex) => ({
        date: date.with({ day: dayIndex + 1 }),
        events: [],
      })
    )

    return { date, leadingDays, days }
  })
}

export const positionEventsInYearGrid = (
  yearGrid: YearGrid,
  events: CalendarEventInternal[]
): YearGrid => {
  const daysByDate = yearGrid
    .flatMap((month) => month.days)
    .reduce(
      (result, day) => {
        result[day.date.toString()] = day
        return result
      },
      {} as Record<string, YearGridDay>
    )
  const firstDate = yearGrid[0].days[0].date
  const lastMonth = yearGrid[yearGrid.length - 1]
  const lastDate = lastMonth.days[lastMonth.days.length - 1].date

  events.forEach((event) => {
    const eventStart = Temporal.PlainDate.from(
      dateFromDateTime(event.start.toString())
    )
    const eventEnd = Temporal.PlainDate.from(
      dateFromDateTime(event.end.toString())
    )
    let currentDate =
      Temporal.PlainDate.compare(eventStart, firstDate) < 0
        ? firstDate
        : eventStart
    const visibleEnd =
      Temporal.PlainDate.compare(eventEnd, lastDate) > 0 ? lastDate : eventEnd

    while (Temporal.PlainDate.compare(currentDate, visibleEnd) <= 0) {
      daysByDate[currentDate.toString()]?.events.push(event)
      currentDate = currentDate.add({ days: 1 })
    }
  })

  return yearGrid
}
