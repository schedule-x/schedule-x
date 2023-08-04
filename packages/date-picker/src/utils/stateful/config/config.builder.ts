import Builder from '../../../../../../shared/interfaces/builder.interface'
import DatePickerConfigInternal from './config.interface'
import { ConfigImpl } from './config.impl'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'

export class ConfigBuilder implements Builder<DatePickerConfigInternal> {
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  min: string | undefined
  max: string | undefined

  build(): DatePickerConfigInternal {
    return new ConfigImpl(this.locale, this.firstDayOfWeek, this.min, this.max)
  }

  withLocale(locale: string | undefined): ConfigBuilder {
    this.locale = locale

    return this
  }

  withFirstDayOfWeek(firstDayOfWeek: WeekDay | undefined): ConfigBuilder {
    this.firstDayOfWeek = firstDayOfWeek

    return this
  }

  withMin(min: string | undefined): ConfigBuilder {
    this.min = min

    return this
  }

  withMax(max: string | undefined): ConfigBuilder {
    this.max = max

    return this
  }
}
