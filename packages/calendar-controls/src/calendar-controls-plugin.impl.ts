import CalendarControlsPlugin from '@schedule-x/shared/src/interfaces/calendar-controls/calendar-controls-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { dateStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'

class CalendarControlsPluginImpl implements CalendarControlsPlugin {
  name: string = PluginName.CalendarControls
  $app!: CalendarAppSingleton

  init($app: CalendarAppSingleton): void {
    this.$app = $app
  }

  setDate(date: string): void {
    if (!dateStringRegex.test(date))
      throw new Error('Invalid date. Expected format YYYY-MM-DD')

    this.$app.datePickerState.selectedDate.value = date
  }

  setView(view: string): void {
    const viewExists = this.$app.config.views.some((v) => v.name === view)
    if (!viewExists)
      throw new Error(
        `Invalid view name. Expected one of ${this.$app.config.views.map((v) => v.name).join(', ')}`
      )

    this.$app.calendarState.view.value = view
  }

  getDate(): string {
    return this.$app.datePickerState.selectedDate.value
  }

  getView(): string {
    return this.$app.calendarState.view.value
  }
}

export const createCalendarControlsPlugin = (): CalendarControlsPlugin => {
  return new CalendarControlsPluginImpl()
}
