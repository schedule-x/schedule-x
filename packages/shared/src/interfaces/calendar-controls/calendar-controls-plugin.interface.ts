import PluginBase from '../plugin.interface'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { DateRange } from '../../types/date-range'
import { WeekDay } from '../../enums/time/week-day.enum'

export default interface CalendarControlsPlugin extends PluginBase {
  init($app: CalendarAppSingleton): void
  setDate(date: string): void
  setView(view: string): void
  setFirstDayOfWeek(dayOfWeek: WeekDay): void
  setNDays(nDays: number): void
  getDate(): string
  getView(): string
  getFirstDayOfWeek(): WeekDay
  getNDays(): number
  getRange(): DateRange | null
}
