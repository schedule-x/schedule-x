import { Agenda } from '../../types/month-agenda'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'

export const createAgendaWeek = (
  date: Temporal.ZonedDateTime | Temporal.PlainDate,
  timeUnitsImpl: TimeUnits
): Agenda => {
  const weekDates = timeUnitsImpl.getWeekFor(date)

  return {
    weeks: [
      weekDates.map((date) => {
        return {
          date: date.toPlainDate(),
          events: [],
        }
      }),
    ],
  }
}
