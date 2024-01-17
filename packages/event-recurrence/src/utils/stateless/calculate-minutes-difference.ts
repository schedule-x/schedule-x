import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

export const calculateMinutesDifference = (
  dateTime1: string,
  dateTime2: string
) => {
  const date1 = toJSDate(dateTime1)
  const date2 = toJSDate(dateTime2)
  const timeDifference = date2.getTime() - date1.getTime()
  return Math.round(timeDifference / (1000 * 60))
}
