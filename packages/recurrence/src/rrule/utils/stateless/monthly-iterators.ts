import { RRuleOptions } from '../../types/rrule-options'
import {
  isCountReached,
  isDatePastUntil,
  compareTemporalDates,
} from './iterator-utils'
import { parseBydaySpec, getWeekdayOccurrencesInMonth } from './weekday-utils'

const monthlyIteratorBymonthday = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  options: RRuleOptions
) => {
  let currentDate = dtstart
  const allDateTimes: (Temporal.ZonedDateTime | Temporal.PlainDate)[] = []

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

      const nextCurrentDateCandidate = currentDate.add({
        months: options.interval,
      })
      let currentIntervalCandidate = options.interval
      let nextMonthDateCandidate = nextCurrentDateCandidate.day

      while (nextMonthDateCandidate !== options.bymonthday) {
        currentIntervalCandidate += options.interval
        nextMonthDateCandidate = currentDate.add({
          months: currentIntervalCandidate,
        }).day
      }

      currentDate = currentDate.add({ months: currentIntervalCandidate })

      return { done: false, value: allDateTimes }
    },
  }
}

const monthlyIteratorByday = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  options: RRuleOptions
) => {
  let currentDate = dtstart
  const allDateTimes: (Temporal.ZonedDateTime | Temporal.PlainDate)[] = []

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
            compareTemporalDates(candidate, dtstart) >= 0 &&
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

      currentDate = currentDate.add({ months: options.interval })

      return { done: false, value: allDateTimes }
    },
  }
}

const getMonthlyBydayCandidates = (
  dateTime: Temporal.ZonedDateTime | Temporal.PlainDate,
  byday: string[]
): (Temporal.ZonedDateTime | Temporal.PlainDate)[] => {
  const candidates: (Temporal.ZonedDateTime | Temporal.PlainDate)[] = []
  const year = dateTime.year
  const month = dateTime.month

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
    // getWeekdayOccurrencesInMonth expects JS Date month (0-based), but Temporal uses 1-based
    const occurrences = getWeekdayOccurrencesInMonth(year, month - 1, weekday)

    if (positions.includes(-999)) {
      // Add all occurrences
      for (const day of occurrences) {
        candidates.push(
          dateTime instanceof Temporal.ZonedDateTime
            ? dateTime.with({ day })
            : dateTime.with({ day })
        )
      }
    } else {
      // Add specific positions
      for (const position of positions) {
        if (position > 0 && position <= occurrences.length) {
          const day = occurrences[position - 1]
          candidates.push(
            dateTime instanceof Temporal.ZonedDateTime
              ? dateTime.with({ day })
              : dateTime.with({ day })
          )
        } else if (position < 0) {
          const index = occurrences.length + position
          if (index >= 0 && index < occurrences.length) {
            const day = occurrences[index]
            candidates.push(
              dateTime instanceof Temporal.ZonedDateTime
                ? dateTime.with({ day })
                : dateTime.with({ day })
            )
          }
        }
      }
    }
  }

  return candidates.sort((a, b) => compareTemporalDates(a, b))
}

export const monthlyIteratorResult = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
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
      options.bymonthday = dtstart.day
    }

    const monthlyIter = monthlyIteratorBymonthday(dtstart, options)
    let result = monthlyIter.next()

    while (!result.done) {
      result = monthlyIter.next()
    }

    return result.value
  }
}
