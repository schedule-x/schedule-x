import CalendarAppSingleton from './calendar/calendar-app-singleton'

export default interface PluginBase {
  name: string

  // TODO v2: change to `beforeRender`
  beforeInit?($app: CalendarAppSingleton): void
  // TODO v2: change to `onRender` and remove $app parameter
  init?($app: CalendarAppSingleton): void
  destroy?(): void
}
