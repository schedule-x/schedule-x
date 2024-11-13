/* eslint-disable max-lines */
import Builder from '@schedule-x/shared/src/interfaces/builder.interface'
import CalendarConfigInternal, {
  CalendarType,
  MonthGridOptions,
  Plugins,
  WeekOptions,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarConfigImpl from './calendar-config.impl'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import {
  DayBoundariesExternal,
  DayBoundariesInternal,
} from '@schedule-x/shared/src/types/calendar/day-boundaries'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarCallbacks } from '@schedule-x/shared/src/interfaces/calendar/listeners.interface'
import {
  DEFAULT_DAY_BOUNDARIES,
  DEFAULT_WEEK_GRID_HEIGHT,
} from '../../../constants'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

export default class CalendarConfigBuilder
  implements Builder<CalendarConfigInternal>
{
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  defaultView: ViewName | undefined
  views: View[] | undefined
  dayBoundaries: DayBoundariesInternal | undefined
  weekOptions: WeekOptions = {
    gridHeight: DEFAULT_WEEK_GRID_HEIGHT,
    nDays: 7,
    eventWidth: 100,
    timeAxisFormatOptions: { hour: 'numeric' },
  }
  monthGridOptions: MonthGridOptions | undefined
  calendars: Record<string, CalendarType> | undefined
  plugins: Plugins = {}
  isDark: boolean | undefined = false
  isResponsive: boolean | undefined = true
  callbacks: CalendarCallbacks | undefined
  minDate: string | undefined
  maxDate: string | undefined
  backgroundEvents: BackgroundEvent[] | undefined

  build(): CalendarConfigInternal {
    return new CalendarConfigImpl(
      this.locale || DEFAULT_LOCALE,
      this.firstDayOfWeek || DEFAULT_FIRST_DAY_OF_WEEK,
      this.defaultView || InternalViewName.Week,
      this.views || [],
      this.dayBoundaries || DEFAULT_DAY_BOUNDARIES,
      this.weekOptions,
      this.calendars,
      this.plugins,
      this.isDark,
      this.isResponsive,
      this.callbacks,
      {},
      this.minDate,
      this.maxDate,
      this.monthGridOptions
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

  withWeekOptions(
    weekOptions: Partial<WeekOptions> | undefined
  ): CalendarConfigBuilder {
    this.weekOptions = {
      ...this.weekOptions,
      ...weekOptions,
    }
    return this
  }

  withCalendars(
    calendars: Record<string, CalendarType> | undefined
  ): CalendarConfigBuilder {
    this.calendars = calendars
    return this
  }

  withPlugins(
    plugins: PluginBase<string>[] | undefined
  ): CalendarConfigBuilder {
    if (!plugins) return this

    plugins.forEach((plugin) => {
      this.plugins[plugin.name] = plugin
    })

    return this
  }

  withIsDark(isDark: boolean | undefined): CalendarConfigBuilder {
    this.isDark = isDark
    return this
  }

  withIsResponsive(isResponsive: boolean | undefined): CalendarConfigBuilder {
    this.isResponsive = isResponsive
    return this
  }

  withCallbacks(
    listeners: CalendarCallbacks | undefined
  ): CalendarConfigBuilder {
    this.callbacks = listeners
    return this
  }

  withMinDate(minDate: string | undefined): CalendarConfigBuilder {
    this.minDate = minDate
    return this
  }

  withMaxDate(maxDate: string | undefined): CalendarConfigBuilder {
    this.maxDate = maxDate
    return this
  }

  withMonthGridOptions(
    monthOptions: MonthGridOptions | undefined
  ): CalendarConfigBuilder {
    this.monthGridOptions = monthOptions
    return this
  }

  withBackgroundEvents(backgroundEvents: BackgroundEvent[] | undefined) {
    this.backgroundEvents = backgroundEvents
    return this
  }
}
