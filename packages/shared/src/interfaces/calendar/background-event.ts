import { CSSProperties } from 'preact/compat'
import { Temporal } from 'temporal-polyfill'

export type BackgroundEvent = {
  start: Temporal.PlainDate | Temporal.ZonedDateTime
  end: Temporal.PlainDate | Temporal.ZonedDateTime
  style: CSSProperties
  title?: string
  rrule?: string
  exdate?: string[]
}
