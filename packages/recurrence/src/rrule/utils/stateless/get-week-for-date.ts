import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

export const getWeekForDate = (date: string) => {
  const dateJS = toJSDate(date)
  const dayOfWeek = dateJS.getDay()
  const startOfWeek = new Date(
    dateJS.getTime() - dayOfWeek * 24 * 60 * 60 * 1000
  )

  return Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek.getTime() + index * 24 * 60 * 60 * 1000)
    return toDateString(day)
  })
}
