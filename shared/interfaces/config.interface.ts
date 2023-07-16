import { WeekDay } from '../enums/time/week-day.enum.ts'

export default interface Config {
  locale: string
  firstDayOfWeek: WeekDay
}
