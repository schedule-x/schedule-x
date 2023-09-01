/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '../../../../../../shared/interfaces/builder.interface'
import CalendarConfigInternal from './calendar-config'
import CalendarConfigImpl from './calendar-config.impl'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'
import { View } from '../../../types/view'

export default class CalendarConfigBuilder
  implements Builder<CalendarConfigInternal>
{
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  defaultView: View | undefined

  build(): CalendarConfigInternal {
    return new CalendarConfigImpl(
      this.locale!,
      this.firstDayOfWeek!,
      this.defaultView!
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

  withDefaultView(defaultView: View | undefined): CalendarConfigBuilder {
    this.defaultView = defaultView
    return this
  }
}
