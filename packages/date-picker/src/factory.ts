import DatePickerConfig from './interfaces/config.interface'
import DatePickerApp from './date-picker.app'
import DatePickerStateBuilder from '../../../shared/utils/stateful/date-picker-state/date-picker-state.builder'
import TimeUnitsBuilder from '../../../shared/utils/stateful/time-units/time-units.builder'
import AppSingleton from '../../../shared/interfaces/app-singleton.interface'
import createStore from '../../../shared/utils/stateful/store/createStore'
import { StoreModuleName } from '../../../shared/enums/store-module-name.enum'

export const createDatePicker = (config: DatePickerConfig, el: HTMLElement) => {
  const $app = {
    datePickerState: createStore(
      new DatePickerStateBuilder().build(),
      StoreModuleName.DATE_PICKER_STATE
    ),
    timeUnitsImpl: new TimeUnitsBuilder().build(),
  }

  return new DatePickerApp($app, config, el)
}

export const createDatePickerInternal = (
  $app: AppSingleton,
  config: DatePickerConfig,
  el: HTMLElement
) => {
  return new DatePickerApp($app, config, el)
}
