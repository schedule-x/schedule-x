import { Agenda, AgendaDay } from '../../types/month-agenda'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const getAllEventDates = (startDate: string, endDate: string): string[] => {
  let currentDate = startDate
  const dates = [currentDate]

  while (currentDate < endDate) {
    currentDate = addDays(Temporal.PlainDate.from(currentDate), 1).toString()
    dates.push(currentDate)
  }

  return dates
}

const placeEventInDay =
  (allDaysMap: Record<string, AgendaDay>) => (event: CalendarEventInternal) => {
    getAllEventDates(
      dateFromDateTime(event.start.toString()),
      dateFromDateTime(event.end.toString())
    ).forEach((date) => {
      if (allDaysMap[date]) {
        allDaysMap[date].events.push(event)
      }
    })
  }

export const positionEventsInAgenda = (
  agenda: Agenda,
  eventsSortedByStart: CalendarEventInternal[]
) => {
  const allDaysMap = agenda.weeks.reduce(
    (acc, week) => {
      week.forEach((day) => {
        acc[day.date.toString()] = day
      })
      return acc
    },
    {} as Record<string, AgendaDay>
  )

  eventsSortedByStart.forEach(placeEventInDay(allDaysMap))

  return agenda
}
