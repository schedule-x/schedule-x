import { getWeekForDate } from './get-week-for-date'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { RRuleOptions } from '../../types/rrule-options'
import { getJSDayFromByday } from './byday-jsday-map'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { isCountReached, isDatePastUntil } from './iterator-utils'

const weeklyIterator = (dtstart: string, rruleOptions: RRuleOptions) => {
  const timeInDtstart = timeFromDateTime(dtstart)
  const weekDaysJS = rruleOptions.byday?.map(getJSDayFromByday) || [
    toJSDate(dtstart).getDay(),
  ]
  let currentDate = dtstart
  let currentCount: number = 0
  const allDateTimes: string[] = []
  const firstDayOfWeek = (
    rruleOptions.wkst
      ? ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].indexOf(rruleOptions.wkst)
      : 0
  ) as 0 | 1 | 2 | 3 | 4 | 5 | 6
  const mappedExdate = rruleOptions.exdate

  return {
    next() {
      const week = getWeekForDate(currentDate, firstDayOfWeek)
      const candidatesDates = week
        .filter((date) => weekDaysJS.includes(toJSDate(date).getDay()))
        .map((date) => {
          if (timeInDtstart) {
            return `${date} ${timeInDtstart}`
          }

          return date
        })
      candidatesDates.forEach((candidate) => {
        if (
          candidate >= dtstart &&
          !isCountReached(allDateTimes.length, rruleOptions.count) &&
          !isDatePastUntil(candidate, rruleOptions.until)
        ) {
          if (!mappedExdate?.has(candidate)) {
            allDateTimes.push(candidate)
          }
          currentCount++
        }
      })

      if (
        isDatePastUntil(currentDate, rruleOptions.until) ||
        isCountReached(currentCount, rruleOptions.count)
      ) {
        return { done: true, value: allDateTimes }
      }

      const nextDateJS = toJSDate(currentDate)
      nextDateJS.setDate(nextDateJS.getDate() + 7 * rruleOptions.interval)
      currentDate = toDateString(nextDateJS)

      return { done: false, value: allDateTimes }
    },
  }
}

export const weeklyIteratorResult = (
  dtstart: string,
  rruleOptions: RRuleOptions
) => {
  const weeklyIter = weeklyIterator(dtstart, rruleOptions)
  let result = weeklyIter.next()
  while (!result.done) {
    result = weeklyIter.next()
  }

  return result.value
}
