import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared'

class EventRecurrencePlugin implements PluginBase {
  name = 'event-recurrence'

  init($app: CalendarAppSingleton): void {
    console.log(1)
  }

  destroy(): void {
    console.log(1)
  }
}
