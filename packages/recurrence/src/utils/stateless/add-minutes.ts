import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

export const addMinutes = (dateTimeString: string, minutes: number) => {
  const dateTime = toJSDate(dateTimeString)
  dateTime.setMinutes(dateTime.getMinutes() + minutes)
  return toDateTimeString(dateTime)
}
