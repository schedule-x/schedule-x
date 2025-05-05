import { RRuleOptions } from '../../types/rrule-options'
import { isCountReached, isDatePastUntil } from './iterator-utils'
import { addYears } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const yearlyIterator = (dtstart: string, rruleOptions: RRuleOptions) => {
  const allDateTimes: string[] = []
  let currentDate = dtstart

  return {
    next() {
      if (
        !isCountReached(allDateTimes.length, rruleOptions.count) &&
        !isDatePastUntil(currentDate, rruleOptions.until)
      ) {
        allDateTimes.push(currentDate)
      }

      if (
        isDatePastUntil(currentDate, rruleOptions.until) ||
        isCountReached(allDateTimes.length, rruleOptions.count)
      ) {
        return { done: true, value: allDateTimes }
      }

      currentDate = addYears(currentDate, rruleOptions.interval)

      return { done: false, value: allDateTimes }
    },
  }
}

export const yearlyIteratorResult = (
  dtstart: string,
  rruleOptions: RRuleOptions
) => {
  const yearlyIter = yearlyIterator(dtstart, rruleOptions)
  let result = yearlyIter.next()

  while (!result.done) {
    result = yearlyIter.next()
  }

  return result.value
}
