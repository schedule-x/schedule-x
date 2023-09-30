/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '@schedule-x/shared/src/interfaces/builder.interface'
import DatePickerAppSingleton from './date-picker-app.singleton'
import DatePickerAppSingletonImpl from './date-picker-app-singleton.impl'
import DatePickerState from '../date-picker-state/date-picker-state.interface'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { TranslateFn } from '@schedule-x/translations/src'

export default class DatePickerAppSingletonBuilder
  implements Builder<DatePickerAppSingleton>
{
  private datePickerState: DatePickerState | undefined
  private config: DatePickerConfigInternal | undefined
  private timeUnitsImpl: TimeUnits | undefined
  private translate: TranslateFn | undefined

  build(): DatePickerAppSingleton {
    return new DatePickerAppSingletonImpl(
      this.datePickerState!,
      this.config!,
      this.timeUnitsImpl!,
      this.translate!
    )
  }

  withDatePickerState(
    datePickerState: DatePickerState
  ): DatePickerAppSingletonBuilder {
    this.datePickerState = datePickerState
    return this
  }

  withConfig(config: DatePickerConfigInternal): DatePickerAppSingletonBuilder {
    this.config = config
    return this
  }

  withTimeUnitsImpl(timeUnitsImpl: TimeUnits): DatePickerAppSingletonBuilder {
    this.timeUnitsImpl = timeUnitsImpl
    return this
  }

  withTranslate(translate: TranslateFn): DatePickerAppSingletonBuilder {
    this.translate = translate
    return this
  }
}
