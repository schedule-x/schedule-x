import { MonthAgenda } from '../../types/month-agenda'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

export const createAgendaMonth = (
  date: string,
  timeUnitsImpl: TimeUnits
): MonthAgenda => {
  const { year, month } = toIntegers(date)
  const monthWithDates = timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
    year,
    month
  )

  const weeks = monthWithDates.map((week) => {
    return week.map((date) => {
      return {
        date: toDateString(date),
        events: [],
      }
    })
  })

  return {
    weeks,
  }
}
