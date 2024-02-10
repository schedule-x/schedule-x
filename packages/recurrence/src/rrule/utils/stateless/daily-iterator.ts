import { RRuleOptions } from '../../types/rrule-options'
import {
  toDateString,
  toDateTimeString,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { getJSDayFromByday } from './byday-jsday-map'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { isCountReached, isDatePastUntil } from './iterator-utils'

const dailyIterator = (dtstart: string, rruleOptions: RRuleOptions) => {
  let currentDate = dtstart
  const allDateTimes: string[] = []
  const bydayNumbers: number[] | undefined =
    rruleOptions.byday?.map(getJSDayFromByday) || undefined
  console.log(bydayNumbers)
  const isDateTime = dateTimeStringRegex.test(dtstart)

  return {
    next() {
      if (
        !isCountReached(allDateTimes.length, rruleOptions.count) &&
        !isDatePastUntil(currentDate, rruleOptions.until)
      ) {
        if (bydayNumbers) {
          const dayOfWeek = toJSDate(currentDate).getDay()
          console.log(dayOfWeek)
          console.log(bydayNumbers.includes(dayOfWeek))
          if (bydayNumbers.includes(dayOfWeek)) {
            allDateTimes.push(currentDate)
          }
        } else {
          allDateTimes.push(currentDate)
        }
      }

      const untilDateHasPassed = isDatePastUntil(
        currentDate,
        rruleOptions.until
      )
      const countIsReached = isCountReached(
        allDateTimes.length,
        rruleOptions.count
      )
      if (untilDateHasPassed || countIsReached) {
        return { done: true, value: allDateTimes }
      }

      const nextDateJS = new Date(currentDate)
      nextDateJS.setDate(nextDateJS.getDate() + rruleOptions.interval)
      currentDate = isDateTime
        ? toDateTimeString(nextDateJS)
        : toDateString(nextDateJS)

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
