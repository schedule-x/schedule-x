import { Temporal } from 'temporal-polyfill'

export const isToday = (date: Temporal.ZonedDateTime) => {
  const today = Temporal.Now.zonedDateTimeISO()
  return (
    date.day === today.day &&
    date.month === today.month &&
    date.year === today.year
  )
}

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}
