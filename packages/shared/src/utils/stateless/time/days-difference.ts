import { toIntegers } from './format-conversion/format-conversion'

export const calculateDaysDifference = (
  startDate: string,
  endDate: string
): number => {
  const { year: sYear, month: sMonth, date: sDate } = toIntegers(startDate)
  const { year: eYear, month: eMonth, date: eDate } = toIntegers(endDate)
  const startDateObj = new Date(sYear, sMonth, sDate)
  const endDateObj = new Date(eYear, eMonth, eDate)
  const timeDifference = endDateObj.getTime() - startDateObj.getTime()
  return Math.round(timeDifference / (1000 * 3600 * 24))
}
