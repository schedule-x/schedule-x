import PluginBase from '../plugin.interface'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'

export default interface CalendarControlsPlugin extends PluginBase {
  init($app: CalendarAppSingleton): void
  setDate(date: string): void
  setView(view: string): void
}
