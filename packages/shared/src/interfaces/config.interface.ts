import { WeekDay } from '../enums/time/week-day.enum'
import { Signal } from '@preact/signals'

/**
 * This interface serves as a bridge between the config interface for the date picker and the calendar.
 * */
export default interface Config {
  locale: Signal<string>
  firstDayOfWeek: Signal<WeekDay>
}
