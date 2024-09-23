import { WeekDay } from '../enums/time/week-day.enum'
import { Signal } from '@preact/signals'
import TimeUnits from '../utils/stateful/time-units/time-units.interface'

/**
 * This interface serves as a bridge between the config interface for the date picker amd the calendar.
 * */
export default interface Config {
  locale: Signal<string>
  firstDayOfWeek: Signal<WeekDay>
  timeUnits: TimeUnits
}
