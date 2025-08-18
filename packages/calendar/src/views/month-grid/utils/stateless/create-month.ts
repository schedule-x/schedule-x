import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { Month, MonthWeek } from '../../types/month'

const createWeekForMonth = (week: MonthWeek, day: Temporal.ZonedDateTime) => {
  week.push({
    date: Temporal.ZonedDateTime.from(day.toString()).toPlainDate(),
    events: {},
    backgroundEvents: [],
  })

  return week
}

export const createMonth = (
  date: Temporal.PlainDate,
  timeUnitsImpl: TimeUnits
) => {
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
