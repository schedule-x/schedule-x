import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

export const calculateMinutesDifference = (
  dateTime1: string,
  dateTime2: string
) => {
  const timeDifference =
    toJSDate(dateTime2).getTime() - toJSDate(dateTime1).getTime()
  return Math.round(timeDifference / (1000 * 60))
}
