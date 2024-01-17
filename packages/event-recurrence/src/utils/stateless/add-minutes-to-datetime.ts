import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

export const addMinutesToDatetime = (
  dateTime: string,
  minutes: number
): string => {
  const date = toJSDate(dateTime)
  date.setMinutes(date.getMinutes() + minutes)
  return toDateTimeString(date)
}
