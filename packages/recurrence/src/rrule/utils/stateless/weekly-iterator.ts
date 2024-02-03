import { getWeekForDate } from './get-week-for-date'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { RRuleOptions } from '../../types/rrule-options'
import { getJSDayFromByday } from './byday-jsday-map'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'

const weeklyIterator = (dtstart: string, rruleOptions: RRuleOptions) => {
  const dtstartTime = timeFromDateTime(dtstart)
  const weekDaysJS = rruleOptions.byday?.map(getJSDayFromByday) || [
    toJSDate(dtstart).getDay(),
  ]
  let currentDate = dtstart
  const allDateTimes: string[] = []

  const hasDatePassed = (date: string) =>
    rruleOptions.until && date > rruleOptions.until
  const isCountReached = (count: number) =>
    rruleOptions.count && count >= rruleOptions.count

  return {
    next() {
      const week = getWeekForDate(currentDate)
      const candidates = week
        .filter((date) => weekDaysJS.includes(toJSDate(date).getDay()))
        .map((date) => {
          if (dtstartTime) {
            return `${date} ${dtstartTime}`
          }

          return date
        })
      candidates.forEach((candidate) => {
        if (
          candidate >= dtstart &&
          !isCountReached(allDateTimes.length) &&
          !hasDatePassed(candidate)
        ) {
          allDateTimes.push(candidate)
        }
      })

      /* RFC5545: #2 */
      const untilDateHasPassed = hasDatePassed(currentDate)

      const countIsReached = isCountReached(allDateTimes.length)
      if (untilDateHasPassed || countIsReached) {
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
