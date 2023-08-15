import { DatePickerConfigExternal } from './utils/stateful/config/config.interface'
import DatePickerApp from './date-picker.app'
import TimeUnitsBuilder from '../../../shared/utils/stateful/time-units/time-units.builder'
import DatePickerAppSingleton from './utils/stateful/app-singleton/date-picker-app.singleton'
import { createDatePickerState } from '../../../shared/utils/stateful/date-picker-state/date-picker-state.impl'
import DatePickerAppSingletonBuilder from './utils/stateful/app-singleton/date-picker-app-singleton.builder'
import { ConfigBuilder } from './utils/stateful/config/config.builder'
import { Placement } from './enums/placement.enum'
import { translations, translate } from '../../translations/src'

export const createDatePicker = (
  config: DatePickerConfigExternal,
  el: HTMLElement
) => {
  const configInternal = new ConfigBuilder()
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withLocale(config.locale)
    .withMin(config.min)
    .withMax(config.max)
    .withPlacement(config.placement as Placement)
    .build()
  const timeUnitsImpl = new TimeUnitsBuilder()
    .withFirstDayOfWeek(configInternal.firstDayOfWeek)
    .build()
  const $app: DatePickerAppSingleton = new DatePickerAppSingletonBuilder()
    .withConfig(configInternal)
    .withDatePickerState(
      createDatePickerState(configInternal.locale, config.selectedDate)
    )
    .withTimeUnitsImpl(timeUnitsImpl)
    .withTranslate(translate(configInternal.locale, translations))
    .build()

  return new DatePickerApp($app, el)
}

export const createDatePickerInternal = (
  $app: DatePickerAppSingleton,
  el: HTMLElement
) => {
  return new DatePickerApp($app, el)
}
