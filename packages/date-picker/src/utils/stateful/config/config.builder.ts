import Builder from '@schedule-x/shared/src/interfaces/builder.interface'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import { ConfigImpl } from './config.impl'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { DatePickerListeners } from '@schedule-x/shared/src/interfaces/date-picker/listeners.interface'
import { DatePickerStyle } from '@schedule-x/shared/src/interfaces/date-picker/style.interface'
import { Temporal } from 'temporal-polyfill'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

export class ConfigBuilder implements Builder<DatePickerConfigInternal> {
  locale: string | undefined
  firstDayOfWeek: WeekDay | undefined
  timezone: IANATimezone | undefined
  min: Temporal.PlainDate | undefined
  max: Temporal.PlainDate | undefined
  placement: Placement | undefined
  listeners: DatePickerListeners | undefined
  style: DatePickerStyle | undefined
  teleportTo?: HTMLElement
  label?: string
  name?: string
  disabled?: boolean

  build(): DatePickerConfigInternal {
    return new ConfigImpl(
      this.locale,
      this.firstDayOfWeek,
      this.timezone,
      this.min,
      this.max,
      this.placement,
      this.listeners,
      this.style,
      this.teleportTo,
      this.label,
      this.name,
      this.disabled
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

  withTimezone(timezone: IANATimezone | undefined): ConfigBuilder {
    this.timezone = timezone

    return this
  }

  withMin(min: Temporal.PlainDate | undefined): ConfigBuilder {
    this.min = min

    return this
  }

  withMax(max: Temporal.PlainDate | undefined): ConfigBuilder {
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

  withName(name: string | undefined): ConfigBuilder {
    this.name = name

    return this
  }

  withDisabled(disabled: boolean | undefined): ConfigBuilder {
    this.disabled = disabled

    return this
  }
}
