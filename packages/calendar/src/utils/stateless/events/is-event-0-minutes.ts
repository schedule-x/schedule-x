import { CalendarEventInternal } from '@schedule-x/shared'
import { DateFormats } from '@schedule-x/shared/src/values/date-formats'

export const isEvent0Minutes = (e: CalendarEventInternal | undefined) => {
  return (
    e?.start === e?.end && DateFormats.DATE_TIME_STRING.test(e?.start || '')
  )
}

export const areEvents0MinutesAndConcurrent = (
  e1: CalendarEventInternal | undefined,
  e2: CalendarEventInternal | undefined
) => {
  return isEvent0Minutes(e1) && isEvent0Minutes(e2) && e1?.start === e2?.start
}
