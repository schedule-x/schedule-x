import { Temporal } from 'temporal-polyfill'

export type DayBoundariesDateTime = {
  start: Temporal.ZonedDateTime
  end: Temporal.ZonedDateTime
}
