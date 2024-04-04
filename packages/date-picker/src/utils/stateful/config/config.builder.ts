import Builder from '@schedule-x/shared/src/interfaces/builder.interface'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import { ConfigImpl } from './config.impl'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { DatePickerListeners } from '@schedule-x/shared/src/interfaces/date-picker/listeners.interface'
import { DatePickerStyle } from '@schedule-x/shared/src/interfaces/date-picker/style.interface'

export class ConfigBuilder implements Builder<DatePickerConfigInternal> {
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  min: string | undefined
  max: string | undefined
  placement: Placement | undefined
  listeners: DatePickerListeners | undefined
  style: DatePickerStyle | undefined
  teleportTo?: HTMLElement
  label?: string

  build(): DatePickerConfigInternal {
    return new ConfigImpl(
      this.locale,
      this.firstDayOfWeek,
      this.min,
      this.max,
      this.placement,
      this.listeners,
      this.style,
      this.teleportTo,
      this.label
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

  withStyle(style: DatePickerStyle | undefined): ConfigBuilder {
    this.style = style

    return this
  }

  withTeleportTo(teleportTo: HTMLElement | undefined): ConfigBuilder {
    this.teleportTo = teleportTo

    return this
  }

  withLabel(label: string | undefined): ConfigBuilder {
    this.label = label

    return this
  }
}
