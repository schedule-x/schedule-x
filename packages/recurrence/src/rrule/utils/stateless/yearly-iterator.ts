import { RRuleOptions } from '../../types/rrule-options'
import { isCountReached, isDatePastUntil } from './iterator-utils'
import { parseBydaySpec, getNthWeekdayOfMonth } from './weekday-utils'

const calculateNextYearlyBydayOccurrence = (
  currentDate: Temporal.ZonedDateTime | Temporal.PlainDate,
  rruleOptions: RRuleOptions
): Temporal.ZonedDateTime | Temporal.PlainDate => {
  const byDayValue = rruleOptions.byday![0]
  const parsed = parseBydaySpec(byDayValue)

  if (!parsed) {
    return currentDate.add({ years: rruleOptions.interval })
  }

  const year = currentDate.year
  const month = currentDate.month
  const nextYear = year + rruleOptions.interval

  // Use bymonth if specified, otherwise use the month from the start date
  const targetMonth = rruleOptions.bymonth || month

  // Default to first occurrence if no position specified
  const position = parsed.position || 1

  // Calculate the nth weekday for the target month in the next year
  const targetDay = getNthWeekdayOfMonth(
    nextYear,
    targetMonth - 1,
    parsed.weekday,
    position
  )

  if (targetDay > 0) {
    return currentDate.with({
      year: nextYear,
      month: targetMonth,
      day: targetDay,
    })
  }

  // If nth occurrence doesn't exist, skip this year
  return currentDate.add({ years: rruleOptions.interval })
}

const yearlyIterator = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  rruleOptions: RRuleOptions
) => {
  const allDateTimes: (Temporal.ZonedDateTime | Temporal.PlainDate)[] = []
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
        currentDate = currentDate.add({ years: rruleOptions.interval })
      }

      return { done: false, value: allDateTimes }
    },
  }
}

export const yearlyIteratorResult = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  rruleOptions: RRuleOptions
) => {
  const yearlyIter = yearlyIterator(dtstart, rruleOptions)
  let result = yearlyIter.next()

  while (!result.done) {
    result = yearlyIter.next()
  }

  return result.value
}
