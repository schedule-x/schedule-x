import { RRuleOptions } from '../../types/rrule-options'
import { isCountReached, isDatePastUntil } from './iterator-utils'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { __deprecated__addMonthsToDateOrDatetime } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const monthlyIteratorBymonthday = (dtstart: string, options: RRuleOptions) => {
  let currentDate = dtstart
  const allDateTimes: string[] = []

  return {
    next() {
      if (
        !isCountReached(allDateTimes.length, options.count) &&
        !isDatePastUntil(currentDate, options.until)
      ) {
        allDateTimes.push(currentDate)
      }

      if (
        isDatePastUntil(currentDate, options.until) ||
        isCountReached(allDateTimes.length, options.count)
      ) {
        return { done: true, value: allDateTimes }
      }

      const nextCurrentDateCandidate = __deprecated__addMonthsToDateOrDatetime(
        currentDate,
        options.interval
      )
      let currentIntervalCandidate = options.interval
      let { date: nextMonthDateCandidate } = toIntegers(
        nextCurrentDateCandidate
      )

      while (nextMonthDateCandidate !== options.bymonthday) {
        currentIntervalCandidate += options.interval
        nextMonthDateCandidate = toIntegers(
          __deprecated__addMonthsToDateOrDatetime(
            currentDate,
            currentIntervalCandidate
          )
        ).date
      }

      currentDate = __deprecated__addMonthsToDateOrDatetime(
        currentDate,
        currentIntervalCandidate
      )

      return { done: false, value: allDateTimes }
    },
  }
}

export const monthlyIteratorResult = (
  dtstart: string,
  options: RRuleOptions
) => {
  if (!options.bymonthday) {
    options.bymonthday = toIntegers(dtstart).date
  }

  const monthlyIter = monthlyIteratorBymonthday(dtstart, options)
  let result = monthlyIter.next()

  while (!result.done) {
    result = monthlyIter.next()
  }

  return result.value
}
