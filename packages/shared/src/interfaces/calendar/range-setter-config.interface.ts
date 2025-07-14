import TimeUnits from '../../utils/stateful/time-units/time-units.interface'
import CalendarConfigInternal from './calendar-config'
import { DateRange } from '../../types/date-range'
import { Signal } from '@preact/signals'
import { Temporal } from 'temporal-polyfill'

export interface RangeSetterConfig {
  date: Temporal.ZonedDateTime
  timeUnitsImpl: TimeUnits
  calendarConfig: CalendarConfigInternal
  range: Signal<DateRange | null>
}
