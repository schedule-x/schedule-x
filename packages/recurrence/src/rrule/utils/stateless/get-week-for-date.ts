import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

export const getWeekForDate = (date: string) => {
  const dateJS = toJSDate(date)
  const dayOfWeek = dateJS.getDay()
  const startOfWeek = new Date(dateJS)
  startOfWeek.setDate(dateJS.getDate() - dayOfWeek)
  startOfWeek.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + index)
    return toDateString(day)
  })
}
