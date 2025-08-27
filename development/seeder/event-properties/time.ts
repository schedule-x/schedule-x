import { getRandomElementOfArray } from '../helpers/get-random-element-in-array.ts'
import { NUMBER_OF_EVENTS, CLI_MONTH_ARG_PATTERN } from '../faker-config.ts'
import { Temporal } from 'temporal-polyfill'


const createDateTimeString = (dateObject: Date) => {
  const d = new Date(dateObject)
  const year = d.getFullYear()
  const oneIndexedMonth = d.getMonth() + 1
  const month = oneIndexedMonth < 10 ? `0${oneIndexedMonth}` : oneIndexedMonth
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
  const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
  const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()

  return `${year}-${month}-${date} ${hour}:${minutes}`
}

const createDateString = (dateObject: Date) => {
  const d = new Date(dateObject)
  const year = d.getFullYear()
  const oneIndexedMonth = d.getMonth() + 1
  const month = oneIndexedMonth < 10 ? `0${oneIndexedMonth}` : oneIndexedMonth
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()

  return `${year}-${month}-${date}`
}

/**
 * The arguments here, are provided by the user via the command line arguments --year and --month
 * */
export const getListOfTimePropertiesForEvents = (
  monthArg: string | null = null
) => {
  const timesArray = []

  const d =
    typeof monthArg === 'string' && CLI_MONTH_ARG_PATTERN.test(monthArg)
      ? new Date(+monthArg.substring(0, 4), +monthArg.substring(5, 7) - 1)
      : new Date()

  const month = d.getMonth()
  const year = d.getFullYear()
  const minutes = [
    0, 5, 10, 14, 15, 20, 25, 30, 35, 40, 45, 47, 50, 52, 55, 60, 90, 120, 180,
  ]
  const minutesForAdding = [
    15, 30, 45, 45, 50, 60, 60, 60, 90, 90, 90, 90, 90, 90, 120, 120, 120,
  ]
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ]
  const datesOfMonth = []
  const lastDateOfMonth = new Date(year, month, 0).getDate()

  let date = 1
  while (date <= lastDateOfMonth) {
    datesOfMonth.push(date)
    date++
  }

  // Create NUMBER_OF_EVENTS + 1000 time-objects, to prevent cluttering in the time space
  while (timesArray.length < NUMBER_OF_EVENTS + 1000) {
    const startDate = new Date(
      year,
      month,
      getRandomElementOfArray(datesOfMonth) as number,
      getRandomElementOfArray(hours) as number,
      getRandomElementOfArray(minutes) as number
    )

    // For every Nth event, create a full day-event
    if (timesArray.length % 10 === 0) {
      const daysToAdd = getRandomElementOfArray([
        0, 0, 0, 1, 1, 1, 5, 7, 7, 7, 15, 30, 60,
      ]) as number
      const endDate = new Date(startDate.getTime() + daysToAdd * 86400000)

      timesArray.push({
        start: Temporal.PlainDate.from(createDateString(startDate)),
        end: Temporal.PlainDate.from(createDateString(endDate)),
      })
      // But normally, create a timed event
    } else {
      let minutesToAdd = getRandomElementOfArray(minutesForAdding) as number
      if (minutesToAdd === 0) minutesToAdd = 60

      const endDate = new Date(startDate.getTime() + minutesToAdd * 60000)

      timesArray.push({
        start: Temporal.ZonedDateTime.from(createDateTimeString(startDate) + '[UTC]'),
        end: Temporal.ZonedDateTime.from(createDateTimeString(endDate) + '[UTC]'),
      })
    }
  }

  return timesArray
}
