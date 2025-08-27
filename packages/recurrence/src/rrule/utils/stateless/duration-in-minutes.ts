import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

export const getDurationInMinutes = (
  dtstart: string,
  dtend: string
): number => {
  const dtStartJS = toJSDate(dtstart)
  const dtEndJS = toJSDate(dtend)
  return (dtEndJS.getTime() - dtStartJS.getTime()) / 1000 / 60
}

export const getDurationInMinutesTemporal = (
  dtstart: Temporal.ZonedDateTime,
  dtend: Temporal.ZonedDateTime
): number => {
  return (dtend.epochMilliseconds - dtstart.epochMilliseconds) / 1000 / 60
}
