import { MonthAgenda } from '../../types/month-agenda'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { Temporal } from 'temporal-polyfill'

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
