import Builder from '../../../../../../shared/interfaces/builder.interface'
import CalendarConfigInternal from './calendar-config'
import CalendarConfigImpl from './calendar-config.impl'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'

export default class CalendarConfigBuilder
  implements Builder<CalendarConfigInternal>
{
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined

  build(): CalendarConfigInternal {
    return new CalendarConfigImpl(this.locale!, this.firstDayOfWeek!)
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
}
