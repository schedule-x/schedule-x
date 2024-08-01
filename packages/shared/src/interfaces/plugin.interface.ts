import CalendarAppSingleton from './calendar/calendar-app-singleton'

export default interface PluginBase {
  name: string

  // TODO v2: change to `beforeRender`
  /**
   * Allow implementers to dynamically add any properties to the global app object as they see fit.
   * In order to avoid conflict with future properties added to the library, we recommend
   * using the unique prefix `$` for any custom properties added to the global app object.
   * for example $app['$websocketService'] = new WebsocketService().
   * Adding properties to existing sub-objects is discouraged, since this will make your application more
   * brittle to future changes in the library.
   * */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeInit?($app: CalendarAppSingleton | any): void
  // TODO v2: change to `onRender` and remove $app parameter
  /**
   * Allow implementers to dynamically add any properties to the global app object as they see fit.
   * In order to avoid conflict with future properties added to the library, we recommend
   * using the unique prefix `$` for any custom properties added to the global app object.
   * for example $app['$websocketService'] = new WebsocketService().
   * Adding properties to existing sub-objects is discouraged, since this will make your application more
   * brittle to future changes in the library.
   * */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init?($app: CalendarAppSingleton | any): void
  destroy?(): void
}
