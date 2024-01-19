import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { datetime } from 'rrule'

export const toRRuleDatetime = (datetimeString: string) => {
  const { year, month, date, hours, minutes } = toIntegers(datetimeString)
  return datetime(year, month + 1, date, hours || 0, minutes || 0)
}
