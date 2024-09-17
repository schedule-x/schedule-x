import { DatePickerConfigExternal } from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import DatePickerApp from './date-picker.app'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import { createDatePickerState } from './utils/stateful/date-picker-state/date-picker-state.impl'
import DatePickerAppSingletonBuilder from '../../shared/src/utils/stateful/date-picker/app-singleton/date-picker-app-singleton.builder'
import { ConfigBuilder } from './utils/stateful/config/config.builder'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { translations, translate } from '../../translations/src'

export const createAppSingleton = (config: DatePickerConfigExternal = {}) => {
  const configInternal = new ConfigBuilder()
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withLocale(config.locale)
    .withMin(config.min)
    .withMax(config.max)
    .withPlacement(config.placement as Placement)
    .withListeners(config.listeners)
    .withStyle(config.style)
    .withTeleportTo(config.teleportTo)
    .withLabel(config.label)
    .withName(config.name)
    .withDisabled(config.disabled)
    .build()
  const timeUnitsImpl = new TimeUnitsBuilder()
    .withConfig(configInternal)
    .build()
  return new DatePickerAppSingletonBuilder()
    .withConfig(configInternal)
    .withDatePickerState(
      createDatePickerState(configInternal, config.selectedDate)
    )
    .withTimeUnitsImpl(timeUnitsImpl)
    .withTranslate(translate(configInternal.locale, translations))
    .build()
}

export const createDatePicker = (config?: DatePickerConfigExternal) => {
  const $app = createAppSingleton(config)

  return new DatePickerApp($app)
}

export const createDatePickerInternal = ($app: DatePickerAppSingleton) => {
  return new DatePickerApp($app)
}
