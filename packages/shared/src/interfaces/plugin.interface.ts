import CalendarAppSingleton from './calendar/calendar-app-singleton'
import { DateRange } from '../types/date-range'
import { IANATimezone } from '../utils/stateless/time/tzdb'
import { DayBoundariesInternal } from '../types/calendar/day-boundaries'

export default interface PluginBase<Name extends string> {
  name: Name

  /**
   * Allow implementers to dynamically add any properties to the global app object as they see fit.
   * In order to avoid conflict with future properties added to the library, we recommend
   * using the unique prefix `$` for any custom properties added to the global app object.
   * for example $app['$websocketService'] = new WebsocketService().
   * Adding properties to existing sub-objects is discouraged, since this will make your application more
   * brittle to future changes in the library.
   * */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeRender?($app: CalendarAppSingleton | any): void

  /**
   * Allow implementers to dynamically add any properties to the global app object as they see fit.
   * In order to avoid conflict with future properties added to the library, we recommend
   * using the unique prefix `$` for any custom properties added to the global app object.
   * for example $app['$websocketService'] = new WebsocketService().
   * Adding properties to existing sub-objects is discouraged, since this will make your application more
   * brittle to future changes in the library.
   * */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRender?($app: CalendarAppSingleton | any): void

  onRangeUpdate?: (range: DateRange) => void

  onTimezoneChange?: (timezone: IANATimezone) => void

  onDayBoundariesChange?: (dayBoundaries: DayBoundariesInternal) => void

  destroy?(): void
}
