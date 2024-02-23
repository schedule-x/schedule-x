import CalendarControlsPlugin from '@schedule-x/shared/src/interfaces/calendar-controls/calendar-controls-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'

class CalendarControlsPluginImpl implements CalendarControlsPlugin {
  name: string = PluginName.CalendarControls
  $app!: CalendarAppSingleton

  init($app: CalendarAppSingleton): void {
    this.$app = $app
  }

  setDate(date: string): void {
    this.$app.datePickerState.selectedDate.value = date
  }

  setView(view: string): void {
    this.$app.calendarState.view.value = view
  }
}

export const createCalendarControlsPlugin = (): CalendarControlsPlugin => {
  return new CalendarControlsPluginImpl()
}
