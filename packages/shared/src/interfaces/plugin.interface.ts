import CalendarAppSingleton from './calendar/calendar-app-singleton'
import { RecursivePartial } from '../types/recursive-partial'

export default interface PluginBase {
  name: string

  // TODO v2: change to `beforeRender`
  /**
   * use a recursive partial on the $app interface, in order to not break any third party plugins
   * when we add new properties to the $app interface
   * */
  beforeInit?($app: RecursivePartial<CalendarAppSingleton>): void
  // TODO v2: change to `onRender` and remove $app parameter
  /**
   * use a recursive partial on the $app interface, in order to not break any third party plugins
   * when we add new properties to the $app interface
   * */
  init?($app: RecursivePartial<CalendarAppSingleton>): void
  destroy?(): void
}
