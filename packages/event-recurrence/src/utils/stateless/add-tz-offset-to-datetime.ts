import { addMinutesToDatetime } from './add-minutes-to-datetime'

export const addTzOffsetToDatetime = (datetime: string) => {
  return addMinutesToDatetime(datetime, new Date().getTimezoneOffset())
}
