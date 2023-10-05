import Builder from '@schedule-x/shared/src/interfaces/builder.interface'
import CalendarConfigInternal, {
  CalendarType,
  Plugins,
  WeekOptions,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarConfigImpl from './calendar-config.impl'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { ViewName } from '../../../types/view-name'
import { View } from '../../../types/view'
import {
  DayBoundariesExternal,
  DayBoundariesInternal,
} from '../../../types/config/day-boundaries'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'

export default class CalendarConfigBuilder
  implements Builder<CalendarConfigInternal>
{
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  defaultView: ViewName | undefined
  views: View[] | undefined
  dayBoundaries: DayBoundariesInternal | undefined
  weekOptions: WeekOptions | undefined
  calendars: Record<string, CalendarType> | undefined
  plugins: Plugins = {}

  build(): CalendarConfigInternal {
    return new CalendarConfigImpl(
      this.locale,
      this.firstDayOfWeek,
      this.defaultView,
      this.views,
      this.dayBoundaries,
      this.weekOptions,
      this.calendars,
      this.plugins
    )
  }

  withLocale(locale: string | undefined): CalendarConfigBuilder {
    this.locale = locale
    return this
  }

  withFirstDayOfWeek(
    firstDayOfWeek: WeekDay | undefined
  ): CalendarConfigBuilder {
    this.firstDayOfWeek = firstDayOfWeek
    return this
  }

  withDefaultView(defaultView: ViewName | undefined): CalendarConfigBuilder {
    this.defaultView = defaultView
    return this
  }

  withViews(views: View[] | undefined): CalendarConfigBuilder {
    this.views = views
    return this
  }

  withDayBoundaries(
    dayBoundaries: DayBoundariesExternal | undefined
  ): CalendarConfigBuilder {
    if (!dayBoundaries) return this

    this.dayBoundaries = {
      start: timePointsFromString(dayBoundaries.start),
      end: timePointsFromString(dayBoundaries.end),
    }
    return this
  }

  withWeekOptions(weekOptions: WeekOptions | undefined): CalendarConfigBuilder {
    this.weekOptions = weekOptions
    return this
  }

  withCalendars(
    calendars: Record<string, CalendarType> | undefined
  ): CalendarConfigBuilder {
    this.calendars = calendars
    return this
  }

  withPlugins(plugins: PluginBase[] | undefined): CalendarConfigBuilder {
    this.plugins.dragAndDrop = plugins?.find(
      (plugin) => plugin.name === PluginName.DragAndDrop
    ) as DragAndDropPlugin | undefined
    this.plugins.eventModal = plugins?.find(
      (plugin) => plugin.name === PluginName.EventModal
    ) as EventModalPlugin | undefined
    return this
  }
}
