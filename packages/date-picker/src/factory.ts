import { DatePickerConfigExternal } from './utils/stateful/config/config.interface'
import DatePickerApp from './date-picker.app'
import TimeUnitsBuilder from '../../../shared/utils/stateful/time-units/time-units.builder'
import DatePickerAppSingleton from './utils/stateful/app-singleton/date-picker-app.singleton'
import { createDatePickerState } from '../../../shared/utils/stateful/date-picker-state/date-picker-state.impl'
import DatePickerAppSingletonBuilder from './utils/stateful/app-singleton/date-picker-app-singleton.builder'
import { ConfigBuilder } from './utils/stateful/config/config.builder'

export const createDatePicker = (config: DatePickerConfigExternal, el: HTMLElement) => {
  const internalConfig = new ConfigBuilder()
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withLocale(config.locale)
    .withMin(config.min)
    .withMax(config.max)
    .build()
  const timeUnitsImpl = new TimeUnitsBuilder()
    .withFirstDayOfWeek(internalConfig.firstDayOfWeek)
    .build();
  const $app: DatePickerAppSingleton = new DatePickerAppSingletonBuilder()
    .withConfig(internalConfig)
    .withDatePickerState(createDatePickerState())
    .withTimeUnitsImpl(timeUnitsImpl)
    .build()

  return new DatePickerApp($app, el)
}

export const createDatePickerInternal = (
  $app: DatePickerAppSingleton,
  el: HTMLElement
) => {
  return new DatePickerApp($app, el)
}
