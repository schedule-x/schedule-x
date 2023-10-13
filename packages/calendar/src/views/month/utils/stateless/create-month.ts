import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { Month, MonthWeek } from '../../types/month'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

const createWeekForMonth = (acc: MonthWeek, day: Date) => {
  acc[toDateString(day)] = {
    date: toDateString(day),
    events: {},
  }

  return acc
}

export const createMonth = (date: string, timeUnitsImpl: TimeUnits) => {
  const { year, month: monthFromDate } = toIntegers(date)
  const monthWithDates = timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
    year,
    monthFromDate
  )
  const month: Month = []

  for (const week of monthWithDates) {
    month.push(week.reduce(createWeekForMonth, {} as MonthWeek))
  }

  return month
}
