import Builder from '../../../../../../shared/interfaces/builder.interface'
import DatePickerConfig from './config.interface'
import { ConfigImpl } from './config.impl'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'

export class ConfigBuilder implements Builder<DatePickerConfig> {
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  min: string | undefined
  max: string | undefined

  build(): DatePickerConfig {
    return new ConfigImpl(this.locale, this.firstDayOfWeek, this.min, this.max)
  }

  withLocale(locale: string): ConfigBuilder {
    this.locale = locale

    return this
  }

  withFirstDayOfWeek(firstDayOfWeek: WeekDay): ConfigBuilder {
    this.firstDayOfWeek = firstDayOfWeek

    return this
  }

  withMin(min: string): ConfigBuilder {
    this.min = min

    return this
  }

  withMax(max: string): ConfigBuilder {
    this.max = max

    return this
  }
}
