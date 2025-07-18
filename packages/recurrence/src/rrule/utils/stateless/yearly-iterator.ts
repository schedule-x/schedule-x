import { RRuleOptions } from '../../types/rrule-options'
import { isCountReached, isDatePastUntil } from './iterator-utils'
import { __deprecated__addYears } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { formatDateTime } from './date-formatting'
import { parseBydaySpec, getNthWeekdayOfMonth } from './weekday-utils'

const calculateNextYearlyBydayOccurrence = (
  currentDate: string,
  rruleOptions: RRuleOptions
): string => {
  const byDayValue = rruleOptions.byday![0]
  const parsed = parseBydaySpec(byDayValue)

  if (!parsed) {
    return __deprecated__addYears(currentDate, rruleOptions.interval)
  }

  const { year, month, hours, minutes } = toIntegers(currentDate)
  const nextYear = year + rruleOptions.interval

  // Use bymonth if specified, otherwise use the month from the start date
  const targetMonth = rruleOptions.bymonth || month + 1 // toIntegers returns 0-based month

  // Default to first occurrence if no position specified
  const position = parsed.position || 1

  // Calculate the nth weekday for the target month in the next year
  // Note: getNthWeekdayOfMonth expects 0-based month
  const targetDay = getNthWeekdayOfMonth(
    nextYear,
    targetMonth - 1,
    parsed.weekday,
    position
  )

  if (targetDay > 0) {
    return formatDateTime(nextYear, targetMonth - 1, targetDay, hours, minutes)
  }

  // If nth occurrence doesn't exist, skip this year
  return __deprecated__addYears(currentDate, rruleOptions.interval)
}

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

      // Calculate next occurrence
      if (rruleOptions.byday && rruleOptions.byday.length > 0) {
        currentDate = calculateNextYearlyBydayOccurrence(
          currentDate,
          rruleOptions
        )
      } else {
        // Default behavior: add years to the same date
        currentDate = __deprecated__addYears(currentDate, rruleOptions.interval)
      }

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
