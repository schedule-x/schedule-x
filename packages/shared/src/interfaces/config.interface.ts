import { WeekDay } from '../enums/time/week-day.enum'

/**
 * This interface serves as a bridge between the config interface for the date picker amd the calendar.
 * */
export default interface Config {
  locale: string
  firstDayOfWeek: WeekDay
}
