import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

const areSameMinute = (
  start: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime
) => {
  return (
    start.year === end.year &&
    start.month === end.month &&
    start.day === end.day &&
    start.hour === end.hour &&
    start.minute === end.minute
  )
}

export const isEvent0Minutes = (e: CalendarEventInternal | undefined) => {
  return (
    e?.start instanceof Temporal.ZonedDateTime &&
    e?.end instanceof Temporal.ZonedDateTime &&
    areSameMinute(e.start, e.end)
  )
}

export const areEvents0MinutesAndConcurrent = (
  e1: CalendarEventInternal | undefined,
  e2: CalendarEventInternal | undefined
) => {
  return (
    isEvent0Minutes(e1) &&
    isEvent0Minutes(e2) &&
    e1?.start instanceof Temporal.ZonedDateTime &&
    e2?.start instanceof Temporal.ZonedDateTime &&
    areSameMinute(e1.start, e2.start)
  )
}
