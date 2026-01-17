import CalendarControlsPlugin from '@schedule-x/shared/src/interfaces/calendar-controls/calendar-controls-plugin.interface'
import { CalendarAppSingleton, View } from '@schedule-x/shared/src'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
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
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'
import { Resource } from '@schedule-x/shared/src/types/calendar/resource'

class CalendarControlsPluginImpl implements CalendarControlsPlugin {
  name = PluginName.CalendarControls
  $app!: CalendarAppSingleton

  beforeRender($app: CalendarAppSingleton) {
    this.$app = $app
  }

  onRender($app: CalendarAppSingleton): void {
    this.$app = $app
  }

  setDate(date: Temporal.PlainDate): void {
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

  setViews(views: [View, ...View[]]) {
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
    const newStart = timePointsFromString(dayBoundaries.start)
    const newEnd = timePointsFromString(dayBoundaries.end)

    this.$app.config.dayBoundaries.value = {
      start: newStart,
      end: newEnd,
    }

    Object.values(this.$app.config.plugins).forEach((plugin) => {
      if (plugin?.onDayBoundariesChange) {
        plugin.onDayBoundariesChange({
          start: newStart,
          end: newEnd,
        })
      }
    })
  }

  setWeekOptions(weekOptions: Partial<WeekOptions>) {
    this.$app.config.weekOptions.value = {
      ...this.$app.config.weekOptions.value,
      ...weekOptions,
    }
  }

  setCalendars(calendars: Record<string, CalendarType>) {
    this.$app.config.calendars.value = calendars
  }

  setMinDate(minDate: Temporal.PlainDate | undefined) {
    this.$app.config.minDate.value = minDate
    if (minDate) {
      this.$app.datePickerConfig.min = minDate
    }
  }

  setMaxDate(maxDate: Temporal.PlainDate | undefined) {
    this.$app.config.maxDate.value = maxDate
    if (maxDate) {
      this.$app.datePickerConfig.max = maxDate
    }
  }

  setMonthGridOptions(monthGridOptions: MonthGridOptions) {
    this.$app.config.monthGridOptions.value = monthGridOptions
  }

  setTimezone(timezone: IANATimezone) {
    this.$app.config.timezone.value = timezone

    Object.values(this.$app.config.plugins).forEach((plugin) => {
      if (plugin?.onTimezoneChange) {
        plugin.onTimezoneChange(timezone)
      }
    })
  }

  setResources(resources: Resource[]) {
    this.$app.config.resources.value = resources
  }

  getDate = (): Temporal.PlainDate =>
    this.$app.datePickerState.selectedDate.value

  getView = (): string => this.$app.calendarState.view.value

  getFirstDayOfWeek = (): WeekDay => this.$app.config.firstDayOfWeek.value

  getLocale = (): string => this.$app.config.locale.value

  getViews = (): View[] => this.$app.config.views.value

  getDayBoundaries = (): DayBoundariesExternal => ({
    start: timeStringFromTimePoints(this.$app.config.dayBoundaries.value.start),
    end: timeStringFromTimePoints(this.$app.config.dayBoundaries.value.end),
  })

  getWeekOptions = (): WeekOptions => this.$app.config.weekOptions.value

  getCalendars = (): Record<string, CalendarType> =>
    this.$app.config.calendars.value

  getMinDate = (): Temporal.PlainDate | undefined =>
    this.$app.config.minDate.value

  getMaxDate = (): Temporal.PlainDate | undefined =>
    this.$app.config.maxDate.value

  getMonthGridOptions = (): MonthGridOptions =>
    this.$app.config.monthGridOptions.value

  getResources = (): Resource[] => this.$app.config.resources.value

  getRange = (): DateRange | null => this.$app.calendarState.range.value
}

export const createCalendarControlsPlugin = () => {
  return definePlugin(
    'calendarControls',
    new CalendarControlsPluginImpl()
  ) as CalendarControlsPluginImpl & {
    name: PluginName.CalendarControls
  }
}
