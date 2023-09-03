/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '../../../../../../shared/interfaces/builder.interface'
import CalendarConfigInternal from './calendar-config'
import CalendarConfigImpl from './calendar-config.impl'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'
import { ViewName } from '../../../types/view-name'
import { View } from '../../../types/view'

export default class CalendarConfigBuilder
  implements Builder<CalendarConfigInternal>
{
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  defaultView: ViewName | undefined
  views: View[] | undefined

  build(): CalendarConfigInternal {
    return new CalendarConfigImpl(
      this.locale!,
      this.firstDayOfWeek!,
      this.defaultView!,
      this.views!
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
}
