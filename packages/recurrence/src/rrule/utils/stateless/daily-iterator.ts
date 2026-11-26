import { RRuleOptions } from '../../types/rrule-options'
import { getJSDayFromByday } from './byday-jsday-map'
import { isCountReached, isDatePastUntil } from './iterator-utils'

const dailyIterator = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  rruleOptions: RRuleOptions
) => {
  let currentDate = dtstart
  const allDateTimes: (Temporal.ZonedDateTime | Temporal.PlainDate)[] = []
  const bydayNumbers: number[] | undefined =
    rruleOptions.byday?.map(getJSDayFromByday) || undefined

  return {
    next() {
      if (
        !isCountReached(allDateTimes.length, rruleOptions.count) &&
        !isDatePastUntil(currentDate, rruleOptions.until)
      ) {
        if (bydayNumbers) {
          const dayOfWeek =
            currentDate instanceof Temporal.ZonedDateTime
              ? currentDate.dayOfWeek % 7
              : currentDate.dayOfWeek % 7
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

      currentDate = currentDate.add({ days: rruleOptions.interval })

      return { done: false, value: allDateTimes }
    },
  }
}

export const dailyIteratorResult = (
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
  rruleOptions: RRuleOptions
) => {
  const dailyIter = dailyIterator(dtstart, rruleOptions)
  let result = dailyIter.next()
  while (!result.done) {
    result = dailyIter.next()
  }

  return result.value
}
