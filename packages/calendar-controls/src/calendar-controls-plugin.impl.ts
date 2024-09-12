import CalendarControlsPlugin from '@schedule-x/shared/src/interfaces/calendar-controls/calendar-controls-plugin.interface'
import { CalendarAppSingleton, View } from '@schedule-x/shared/src'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { dateStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { DayBoundariesExternal } from '@schedule-x/shared/src/types/calendar/day-boundaries'
import {
  CalendarType,
  MonthGridOptions,
  WeekOptions,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import {
  timePointsFromString,
  timeStringFromTimePoints,
} from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

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

  setLocale(locale: string) {
    this.$app.config.locale.value = locale
  }

  setDefaultView(defaultView: ViewName) {
    this.$app.config.defaultView.value = defaultView
  }

  setViews(views: [View, ...View]) {
    const currentViewName = this.$app.calendarState.view.value
    const isCurrentViewInViews = views.some(
      (view: View) => view.name === currentViewName
    )
    if (!isCurrentViewInViews)
      throw new Error(
        `Currently active view is not in given views. Expected to find ${currentViewName} in ${views.map((view: View) => view.name).join(',')}`
      )

    this.$app.config.views.value = views
  }

  setDayBoundaries(dayBoundaries: DayBoundariesExternal) {
    this.$app.config.dayBoundaries.value = {
      start: timePointsFromString(dayBoundaries.start),
      end: timePointsFromString(dayBoundaries.end),
    }
  }

  setWeekOptions(weekOptions: WeekOptions) {
    this.$app.config.weekOptions.value = weekOptions
  }

  setCalendars(calendars: Record<string, CalendarType>) {
    this.$app.config.calendars.value = calendars
  }

  setIsDark(isDark: boolean) {
    this.$app.config.isDark.value = isDark
  }

  setMinDate(minDate: string | undefined) {
    this.$app.config.minDate.value = minDate
  }

  setMaxDate(maxDate: string | undefined) {
    this.$app.config.maxDate.value = maxDate
  }

  setMonthGridOptions(monthGridOptions: MonthGridOptions) {
    this.$app.config.monthGridOptions.value = monthGridOptions
  }

  getDate = (): string => this.$app.datePickerState.selectedDate.value

  getView = (): string => this.$app.calendarState.view.value

  getFirstDayOfWeek = (): WeekDay => this.$app.config.firstDayOfWeek.value

  getLocale = (): string => this.$app.config.locale.value

  getDefaultView = (): ViewName => this.$app.config.defaultView.value

  getViews = (): [View, ...View] => this.$app.config.views.value

  getDayBoundaries = (): DayBoundariesExternal => ({
    start: timeStringFromTimePoints(this.$app.config.dayBoundaries.value.start),
    end: timeStringFromTimePoints(this.$app.config.dayBoundaries.value.end),
  })

  getWeekOptions = (): WeekOptions => this.$app.config.weekOptions.value

  getCalendars = (): Record<string, CalendarType> =>
    this.$app.config.calendars.value

  getIsDark = (): boolean => this.$app.config.isDark.value

  getMinDate = (): string | undefined => this.$app.config.minDate.value

  getMaxDate = (): string | undefined => this.$app.config.maxDate.value

  getMonthGridOptions = (): MonthGridOptions =>
    this.$app.config.monthGridOptions.value

  getRange = (): DateRange | null => this.$app.calendarState.range.value
}

export const createCalendarControlsPlugin = (): CalendarControlsPlugin => {
  return new CalendarControlsPluginImpl()
}
