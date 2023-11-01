import { MonthAgenda, MonthAgendaDay } from '../../types/month-agenda'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const getAllEventDates = (startDate: string, endDate: string): string[] => {
  let currentDate = startDate
  const dates = [currentDate]

  while (currentDate < endDate) {
    currentDate = addDays(currentDate, 1)
    dates.push(currentDate)
  }

  return dates
}

const placeEventInDay =
  (allDaysMap: Record<string, MonthAgendaDay>) =>
  (event: CalendarEventInternal) => {
    const eventDates = getAllEventDates(
      dateFromDateTime(event.time.start),
      dateFromDateTime(event.time.end)
    )
    eventDates.forEach((date) => {
      if (allDaysMap[date]) {
        allDaysMap[date].events.push(event)
      }
    })
  }

export const positionEventsInAgenda = (
  agendaMonth: MonthAgenda,
  eventsSortedByStart: CalendarEventInternal[]
) => {
  const allDaysMap = agendaMonth.weeks.reduce(
    (acc, week) => {
      week.forEach((day) => {
        acc[day.date] = day
      })
      return acc
    },
    {} as Record<string, MonthAgendaDay>
  )

  eventsSortedByStart.forEach(placeEventInDay(allDaysMap))

  return agendaMonth
}
