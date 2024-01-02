import CalendarAppSingleton from './calendar/calendar-app-singleton'

export default interface PluginBase {
  name: string

  init?($app: CalendarAppSingleton): void
}
