import { CalendarEventInternal } from '@schedule-x/shared/src'


export const isEvent0Minutes = (e: CalendarEventInternal | undefined) => {
  return (
    e?.start instanceof Temporal.ZonedDateTime &&
    e?.end instanceof Temporal.ZonedDateTime &&
    e?.start.toString() === e?.end.toString()
  )
}

export const areEvents0MinutesAndConcurrent = (
  e1: CalendarEventInternal | undefined,
  e2: CalendarEventInternal | undefined
) => {
  return isEvent0Minutes(e1) && isEvent0Minutes(e2) && e1?.start.toString() === e2?.start.toString()
}
