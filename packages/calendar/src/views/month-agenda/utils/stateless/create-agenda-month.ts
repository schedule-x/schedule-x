import { MonthAgenda } from '../../types/month-agenda'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'

export const createAgendaMonth = (
  date: Temporal.ZonedDateTime,
  timeUnitsImpl: TimeUnits
): MonthAgenda => {
  const monthWithDates = timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
    date.year,
    date.month
  )

  return {
    weeks: monthWithDates.map((week) => {
      return week.map((date) => {
        return {
          date: Temporal.PlainDate.from(date),
          events: [],
        }
      })
    }),
  }
}
