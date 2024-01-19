import { ByWeekday, Frequency } from 'rrule/dist/esm/types'
import { Weekday } from 'rrule/dist/esm/weekday'

export interface EventRRuleOptions {
  freq: Frequency
  interval: number
  wkst: Weekday | number | null
  count: number | null
  until: string | null
  tzid: string | null
  bysetpos: number | number[] | null
  bymonth: number | number[] | null
  bymonthday: number | number[] | null
  bynmonthday: number[] | null
  byyearday: number | number[] | null
  byweekno: number | number[] | null
  byweekday: ByWeekday | ByWeekday[] | null
  bynweekday: number[][] | null
  byhour: number | number[] | null
  byminute: number | number[] | null
  bysecond: number | number[] | null
  byeaster: number | null
}
