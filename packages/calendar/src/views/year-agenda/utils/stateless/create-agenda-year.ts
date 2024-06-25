import { MonthWithDates } from '@schedule-x/shared/src/types/time'
import { YearAgenda as YearAgendaType } from '../../types/year-agenda'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

export const createAgendaYear = (date: string): YearAgendaType => {
  const { year } = toIntegers(date)
  const monthsWithDates = getAllWeeksOfYear(year)
  return monthsWithDates.map((monthWithDates, month) => {
    const date = new Date()
    date.setFullYear(year, month, 1)
    return {
      date: toDateString(date),
      weeks: monthWithDates.map((week) => {
        return week.map((date) => {
          return {
            date: toDateString(date),
            events: [],
          }
        })
      }),
    }
  })
}

function getWeeksOfMonth(year: number, month: number): MonthWithDates {
  const weeks = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

function getAllWeeksOfYear(year: number): MonthWithDates[] {
  const allWeeks = []
  for (let month = 0; month < 12; month++) {
    const weeks = getWeeksOfMonth(year, month)
    allWeeks.push(weeks)
  }
  return allWeeks
}
