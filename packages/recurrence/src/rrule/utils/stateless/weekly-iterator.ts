import { getWeekForDate } from './get-week-for-date'
import { RRuleOptions } from '../../types/rrule-options'
import { getJSDayFromByday } from './byday-jsday-map'
import {
  isCountReached,
  isDatePastUntil,
  compareTemporalDates,
} from './iterator-utils'

const weeklyIterator = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  rruleOptions: RRuleOptions
) => {
  const weekDaysJS = rruleOptions.byday?.map(getJSDayFromByday) || [
    dtstart.dayOfWeek % 7,
  ]
  let currentDate = dtstart
  const allDateTimes: (Temporal.ZonedDateTime | Temporal.PlainDate)[] = []
  const firstDayOfWeek = (
    rruleOptions.wkst
      ? ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].indexOf(rruleOptions.wkst)
      : 0
  ) as 0 | 1 | 2 | 3 | 4 | 5 | 6

  return {
    next() {
      const week = getWeekForDate(currentDate, firstDayOfWeek)
      const candidatesDates = week.filter((date) =>
        weekDaysJS.includes(date.dayOfWeek % 7)
      )

      candidatesDates.forEach((candidate) => {
        if (
          compareTemporalDates(candidate, dtstart) >= 0 &&
          !isCountReached(allDateTimes.length, rruleOptions.count) &&
          !isDatePastUntil(candidate, rruleOptions.until)
        ) {
          allDateTimes.push(candidate)
        }
      })

      if (
        isDatePastUntil(currentDate, rruleOptions.until) ||
        isCountReached(allDateTimes.length, rruleOptions.count)
      ) {
        return { done: true, value: allDateTimes }
      }

      currentDate = currentDate.add({ days: 7 * rruleOptions.interval })

      return { done: false, value: allDateTimes }
    },
  }
}

export const weeklyIteratorResult = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  rruleOptions: RRuleOptions
) => {
  const weeklyIter = weeklyIterator(dtstart, rruleOptions)
  let result = weeklyIter.next()
  while (!result.done) {
    result = weeklyIter.next()
  }

  return result.value
}
