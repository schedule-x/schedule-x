import { RRuleOptions } from '../../types/rrule-options'
import { isCountReached, isDatePastUntil } from './iterator-utils'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { __deprecated__addMonthsToDateOrDatetime } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { formatDateTimeFromString } from './date-formatting'
import { parseBydaySpec, getWeekdayOccurrencesInMonth } from './weekday-utils'

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

const monthlyIteratorByday = (dtstart: string, options: RRuleOptions) => {
  let currentDate = dtstart
  const allDateTimes: string[] = []

  return {
    next() {
      if (
        !isCountReached(allDateTimes.length, options.count) &&
        !isDatePastUntil(currentDate, options.until)
      ) {
        const candidates = getMonthlyBydayCandidates(
          currentDate,
          options.byday!
        )
        for (const candidate of candidates) {
          if (
            candidate >= dtstart &&
            !isDatePastUntil(candidate, options.until)
          ) {
            allDateTimes.push(candidate)
            if (isCountReached(allDateTimes.length, options.count)) {
              return { done: true, value: allDateTimes }
            }
          }
        }
      }

      if (
        isDatePastUntil(currentDate, options.until) ||
        isCountReached(allDateTimes.length, options.count)
      ) {
        return { done: true, value: allDateTimes }
      }

      currentDate = __deprecated__addMonthsToDateOrDatetime(
        currentDate,
        options.interval
      )

      return { done: false, value: allDateTimes }
    },
  }
}

const getMonthlyBydayCandidates = (
  dateTime: string,
  byday: string[]
): string[] => {
  const candidates: string[] = []
  const { year, month } = toIntegers(dateTime)

  // Group byday specs by weekday for efficient processing
  const weekdaySpecs = new Map<number, number[]>()

  for (const daySpec of byday) {
    const parsed = parseBydaySpec(daySpec)
    if (!parsed) continue

    if (!weekdaySpecs.has(parsed.weekday)) {
      weekdaySpecs.set(parsed.weekday, [])
    }

    if (parsed.position === undefined) {
      // No position means all occurrences
      weekdaySpecs.set(parsed.weekday, [-999]) // Special marker for all occurrences
    } else {
      weekdaySpecs.get(parsed.weekday)!.push(parsed.position)
    }
  }

  // Process each weekday only once
  for (const [weekday, positions] of weekdaySpecs) {
    const occurrences = getWeekdayOccurrencesInMonth(year, month, weekday)

    if (positions.includes(-999)) {
      // Add all occurrences
      for (const day of occurrences) {
        candidates.push(formatDateTimeFromString(dateTime, year, month, day))
      }
    } else {
      // Add specific positions
      for (const position of positions) {
        if (position > 0 && position <= occurrences.length) {
          const day = occurrences[position - 1]
          candidates.push(formatDateTimeFromString(dateTime, year, month, day))
        } else if (position < 0) {
          const index = occurrences.length + position
          if (index >= 0 && index < occurrences.length) {
            const day = occurrences[index]
            candidates.push(
              formatDateTimeFromString(dateTime, year, month, day)
            )
          }
        }
      }
    }
  }

  return candidates.sort()
}

export const monthlyIteratorResult = (
  dtstart: string,
  options: RRuleOptions
) => {
  if (options.byday && options.byday.length > 0) {
    const monthlyIter = monthlyIteratorByday(dtstart, options)
    let result = monthlyIter.next()

    while (!result.done) {
      result = monthlyIter.next()
    }

    return result.value
  } else {
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
}
