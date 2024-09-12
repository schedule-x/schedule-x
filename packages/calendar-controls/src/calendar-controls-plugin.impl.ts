import CalendarControlsPlugin from '@schedule-x/shared/src/interfaces/calendar-controls/calendar-controls-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { dateStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'

class CalendarControlsPluginImpl implements CalendarControlsPlugin {
  name: string = PluginName.CalendarControls
  $app!: CalendarAppSingleton

  beforeInit($app: CalendarAppSingleton) {
    this.$app = $app
  }

  /**
   * TODO v2: remove this method
   * */
  init($app: CalendarAppSingleton): void {
    this.$app = $app
  }

  setDate(date: string): void {
    if (!dateStringRegex.test(date))
      throw new Error('Invalid date. Expected format YYYY-MM-DD')

    this.$app.datePickerState.selectedDate.value = date
  }

  setView(view: string): void {
    const viewToSet = this.$app.config.views.value.find((v) => v.name === view)
    if (!viewToSet)
      throw new Error(
        `Invalid view name. Expected one of ${this.$app.config.views.value.map((v) => v.name).join(', ')}`
      )

    this.$app.calendarState.setView(
      view,
      this.$app.datePickerState.selectedDate.value
    )
  }

  setFirstDayOfWeek(firstDayOfWeek: WeekDay) {
    this.$app.config.firstDayOfWeek.value = firstDayOfWeek
  }

  setNDays(nDays: number) {
    this.$app.config.weekOptions.value = {
      ...this.$app.config.weekOptions.value,
      nDays,
    }
  }

  getDate(): string {
    return this.$app.datePickerState.selectedDate.value
  }

  getView(): string {
    return this.$app.calendarState.view.value
  }

  getFirstDayOfWeek(): WeekDay {
    return this.$app.config.firstDayOfWeek.value
  }

  getNDays(): number {
    return this.$app.config.weekOptions.value.nDays
  }

  getRange(): DateRange | null {
    return this.$app.calendarState.range.value
  }
}

export const createCalendarControlsPlugin = (): CalendarControlsPlugin => {
  return new CalendarControlsPluginImpl()
}
