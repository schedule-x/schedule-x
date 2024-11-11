import { timeFromDateTime } from '../format-conversion/string-to-string'
import { calculateDaysDifference } from '../days-difference'

export const isToday = (date: Date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

export const isSameDayEndingMidnight = (
  start: string,
  end: string
): boolean => {
  return (
    timeFromDateTime(end) === '00:00' &&
    calculateDaysDifference(start, end) === 1
  )
}

export const isNotSameDayEndingMidnight = (
  start: string,
  end: string
): boolean => {
  return (
    timeFromDateTime(end) !== '00:00' &&
    calculateDaysDifference(start, end) !== 1
  )
}
