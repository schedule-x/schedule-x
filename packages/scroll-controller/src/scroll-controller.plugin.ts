import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

class ScrollControllerPlugin implements PluginBase {
  name = PluginName.ScrollController

  /**
   * @internal
   * */
  init($app: CalendarAppSingleton) {
    // 1. if not configured for initial scroll, return

    // 3. Set a mutation observer on $app.elements.calendarWrapper to watch for .sx__view-container
    const viewContainer = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__view-container')
    console.log(viewContainer)
  }
}

export const createScrollControllerPlugin = () => new ScrollControllerPlugin()
