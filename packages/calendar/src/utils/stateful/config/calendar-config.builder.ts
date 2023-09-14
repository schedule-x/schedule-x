/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '../../../../../../shared/interfaces/builder.interface'
import CalendarConfigInternal, {
  CalendarType,
  WeekOptions,
} from './calendar-config'
import CalendarConfigImpl from './calendar-config.impl'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'
import { ViewName } from '../../../types/view-name'
import { View } from '../../../types/view'
import {
  DayBoundariesExternal,
  DayBoundariesInternal,
} from '../../../types/config/day-boundaries'
import { timePointsFromString } from '../../stateless/time/time-points/string-conversion'

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

  build(): CalendarConfigInternal {
    return new CalendarConfigImpl(
      this.locale,
      this.firstDayOfWeek,
      this.defaultView,
      this.views,
      this.dayBoundaries,
      this.weekOptions,
      this.calendars
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
}
