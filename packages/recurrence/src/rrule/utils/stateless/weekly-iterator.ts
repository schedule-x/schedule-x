import { getWeekForDate } from './get-week-for-date'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { RRuleOptions } from '../../types/rrule-options'
import { getJSDayFromByday } from './byday-jsday-map'

const weeklyIterator = (dtstart: string, rruleOptions: RRuleOptions) => {
  const weekDaysJS = rruleOptions.byday?.map(getJSDayFromByday) || [
    toJSDate(dtstart).getDay(),
  ]
  let currentDate = dtstart
  const allDateTimes: string[] = []

  return {
    next() {
      /* RFC5545: #2 */
      const untilDateHasPassed =
        rruleOptions.until && currentDate > rruleOptions.until

      const countIsReached =
        rruleOptions.count && allDateTimes.length >= rruleOptions.count
      if (untilDateHasPassed || countIsReached) {
        return { done: true, value: allDateTimes }
      }

      const week = getWeekForDate(currentDate)
      allDateTimes.push(
        ...week.filter((date) => weekDaysJS.includes(toJSDate(date).getDay()))
      )
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
