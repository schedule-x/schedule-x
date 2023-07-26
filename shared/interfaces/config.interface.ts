import { WeekDay } from '../enums/time/week-day.enum'

export default interface Config {
  locale: string
  firstDayOfWeek: WeekDay
}
