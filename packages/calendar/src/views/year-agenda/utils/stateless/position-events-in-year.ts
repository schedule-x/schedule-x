import { isSameMonth } from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { YearAgenda as YearAgendaType } from '../../types/year-agenda'
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

export const positionEventsInYear = (
  agendaYear: YearAgendaType,
  eventsSortedByStart: CalendarEventInternal[]
) => {
  eventsSortedByStart.map((event) => {
    const dates = getAllEventDates(
      dateFromDateTime(event.start),
      dateFromDateTime(event.end)
    )
    dates.filter(
      (date, index) =>
        dates.findIndex((d) => isSameMonth(new Date(d), new Date(date))) ===
        index
    )
    dates.forEach((date) => {
      agendaYear.forEach((agendaMonth) => {
        if (isSameMonth(new Date(agendaMonth.date), new Date(date)))
          agendaMonth.events.push(event)
      })
    })
  })
  return agendaYear
}
