import PluginBase from '../plugin.interface'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { DateRange } from '../../types/date-range'

export default interface CalendarControlsPlugin extends PluginBase {
  init($app: CalendarAppSingleton): void
  setDate(date: string): void
  setView(view: string): void
  getDate(): string
  getView(): string
  getRange(): DateRange | null
}
