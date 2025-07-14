import { Temporal } from 'temporal-polyfill'

export type DateRange = {
  start: Temporal.ZonedDateTime
  end: Temporal.ZonedDateTime
}
