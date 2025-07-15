import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { Month, MonthWeek } from '../../types/month'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { Temporal } from 'temporal-polyfill'

const createWeekForMonth = (week: MonthWeek, day: Temporal.ZonedDateTime) => {
  week.push({
    date: Temporal.ZonedDateTime.from(day).toPlainDate(),
    events: {},
    backgroundEvents: [],
  })

  return week
}

export const createMonth = (date: Temporal.PlainDate, timeUnitsImpl: TimeUnits) => {
  const monthWithDates = timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
    date.year,
    date.month
  )
  const month: Month = []

  for (const week of monthWithDates) {
    month.push(week.reduce(createWeekForMonth, [] as MonthWeek))
  }

  return month
}
