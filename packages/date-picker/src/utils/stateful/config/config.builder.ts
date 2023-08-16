import Builder from '../../../../../../shared/interfaces/builder.interface'
import DatePickerConfigInternal from './config.interface'
import { ConfigImpl } from './config.impl'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'
import { Placement } from '../../../enums/placement.enum'
import { DatePickerListeners } from './listeners.interface'

export class ConfigBuilder implements Builder<DatePickerConfigInternal> {
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  min: string | undefined
  max: string | undefined
  placement: Placement | undefined
  listeners: DatePickerListeners | undefined

  build(): DatePickerConfigInternal {
    return new ConfigImpl(
      this.locale,
      this.firstDayOfWeek,
      this.min,
      this.max,
      this.placement
    )
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

  withPlacement(placement: Placement | undefined): ConfigBuilder {
    this.placement = placement

    return this
  }

  withListeners(listeners: DatePickerListeners | undefined): ConfigBuilder {
    this.listeners = listeners

    return this
  }
}
