import { RRuleOptions } from '../../types/rrule-options'
import { getJSDayFromByday } from './byday-jsday-map'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { isCountReached, isDatePastUntil } from './iterator-utils'
import { __deprecated__addDaysToDateOrDateTime } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const dailyIterator = (dtstart: string, rruleOptions: RRuleOptions) => {
  let currentDate = dtstart
  const allDateTimes: string[] = []
  const bydayNumbers: number[] | undefined =
    rruleOptions.byday?.map(getJSDayFromByday) || undefined

  return {
    next() {
      if (
        !isCountReached(allDateTimes.length, rruleOptions.count) &&
        !isDatePastUntil(currentDate, rruleOptions.until)
      ) {
        if (bydayNumbers) {
          const dayOfWeek = toJSDate(currentDate).getDay()
          if (bydayNumbers.includes(dayOfWeek)) {
            allDateTimes.push(currentDate)
          }
        } else {
          allDateTimes.push(currentDate)
        }
      }

      if (
        isDatePastUntil(currentDate, rruleOptions.until) ||
        isCountReached(allDateTimes.length, rruleOptions.count)
      ) {
        return { done: true, value: allDateTimes }
      }

      currentDate = __deprecated__addDaysToDateOrDateTime(
        currentDate,
        rruleOptions.interval
      )

      return { done: false, value: allDateTimes }
    },
  }
}

export const dailyIteratorResult = (
  dtstart: string,
  rruleOptions: RRuleOptions
) => {
  const dailyIter = dailyIterator(dtstart, rruleOptions)
  let result = dailyIter.next()
  while (!result.done) {
    result = dailyIter.next()
  }

  return result.value
}
