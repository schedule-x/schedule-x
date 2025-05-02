import { RRuleOptions } from '../../types/rrule-options'
import { addMonths } from '@schedule-x/shared/src'
import { isCountReached, isDatePastUntil } from './iterator-utils'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

const monthlyIteratorBymonthday = (dtstart: string, options: RRuleOptions) => {
  let currentDate = dtstart
  let currentCount: number = 0
  const allDateTimes: string[] = []
  const mappedExdate = options.exdate

  return {
    next() {
      if (
        !isCountReached(currentCount, options.count) &&
        !isDatePastUntil(currentDate, options.until)
      ) {
        if (!mappedExdate?.has(currentDate)) {
          allDateTimes.push(currentDate)
        }
        currentCount++
      }

      if (
        isDatePastUntil(currentDate, options.until) ||
        isCountReached(currentCount, options.count)
      ) {
        return { done: true, value: allDateTimes }
      }

      const nextCurrentDateCandidate = addMonths(currentDate, options.interval)
      let currentIntervalCandidate = options.interval
      let { date: nextMonthDateCandidate } = toIntegers(
        nextCurrentDateCandidate
      )

      while (nextMonthDateCandidate !== options.bymonthday) {
        currentIntervalCandidate += options.interval
        nextMonthDateCandidate = toIntegers(
          addMonths(currentDate, currentIntervalCandidate)
        ).date
      }

      currentDate = addMonths(currentDate, currentIntervalCandidate)

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
